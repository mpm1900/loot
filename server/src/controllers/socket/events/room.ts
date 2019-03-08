import { Socket } from 'socket.io'
import { Store } from 'redux'
import { SocketRoom, SocketRoomPublicVisibility } from '../state/reducers/rooms.state'
import * as Utils from '../util'
import { SocketErrors } from '../types'
import { createRoom, joinRoom, removeSessionFromRooms, leaveRooms, removeEmptyRooms, sendMessage, readyUser, cancelReady, battleInitializeState, battleSetSkill, battleExecuteMain, battleExecuteUpkeep, addUserRequest } from '../state/actions/rooms.actions'
import { partyUpdateActiveCharacterId } from '../state/actions/sessions.actions'
import { blastSession } from './session'

export const Events = {
    SET_STATE: 'initialize-state__room',

    CREATE_ROOM: 'room__request-create-room',
    JOIN_ROOM: 'room__request-join-room',
    FIND_ROOM: 'room__request-find-room',
    LEAVE_ROOM: 'room__request-leave-room',
    SEND_MESSAGE: 'room__request-send-message',
    READY_USER: 'room__request-ready-user',
    CANCEL_READY: 'room__request-cancel-ready',

    BATTLE_SET_SKILL: 'room__request-battle-set-skill',
}

export const blastRoom = async (roomId: string, socket: Socket, store: Store, userId: string = null) => {
    const room = store.getState().rooms.filter((r: SocketRoom) => r.id === roomId).first()
    if (room) {
        const state = Utils.serializeRoom(await Utils.populateRoom(room, store.getState().sessions))
        if (!userId) {
            socket.to(room.id).emit(Events.SET_STATE, { state })
            socket.emit(Events.SET_STATE, { state })
        }
    }
}

export const handleLeaveRoom = async (socket: Socket, store: Store, sessionId: string, roomId: string) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        socket.leave(roomId)
        store.dispatch(leaveRooms(session.userId))
        store.dispatch(removeEmptyRooms())
        store.dispatch(removeSessionFromRooms(sessionId))
        await blastRoom(roomId, socket, store)
    }
}

export const handleLeaveRooms = async (socket: Socket, store: Store, userId: string) => {
    let rooms = Utils.findRoomsByUser(store.getState().rooms, userId)
    store.dispatch(leaveRooms(userId))
    store.dispatch(removeEmptyRooms())
    store.dispatch(removeSessionFromRooms(Utils.findSessionIdByUser(store.getState().sessions, userId)))
    const sessions = store.getState().sessions
    rooms = rooms.map(room => Utils.findRoomById(store.getState().rooms, room.id))
    rooms.forEach(async room => {
        if (!room) return
        socket.to(room.id).emit(Events.SET_STATE, {
            state: Utils.serializeRoom(await Utils.populateRoom(room, sessions))
        })
    })
}

export const handleJoinRoom = async (socket: Socket, store: Store, sessionId: string, roomId: string) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    handleLeaveRooms(socket, store, session.userId)
    store.dispatch(joinRoom(roomId, session.userId, session.id))
    socket.join(roomId)
    await blastRoom(roomId, socket, store)
}

export const registerRoomSocketEvents = async (socket: Socket, store: Store) => {
    socket.on(Events.CREATE_ROOM, async ({ sessionId }) => {
        const session = Utils.findSessionById(store.getState().sessions, sessionId)
        if (session) {
            store.dispatch(createRoom(session.userId))
            const room = store.getState().rooms.filter((r: SocketRoom) => r.playerSessionIds.size === 0).first()
            store.dispatch(joinRoom(room.id, session.userId, session.id))
            socket.join(room.id)
            if (session.party.characters.size > 0) {
                store.dispatch(partyUpdateActiveCharacterId(session.id, session.party.characters.get(0).__uuid))
                blastSession(session.id, socket, store)
            }
            await blastRoom(room.id, socket, store)
        }
    })

    socket.on(Events.JOIN_ROOM, async ({ sessionId, roomId }) => {
        const room = Utils.findRoomById(store.getState().rooms, roomId)
        if (room) {
            handleJoinRoom(socket, store, sessionId, room.id)
        } else {
            socket.emit('request-error', SocketErrors.RoomNotFound)
        }
    })

    socket.on(Events.FIND_ROOM, async ({ sessionId }) => {
        const room = store.getState().rooms
            .find((r: SocketRoom) => (
                r.userIds.size == 1 &&
                r.settings.visibility === SocketRoomPublicVisibility.Open
            ))

        if (room) {
            handleJoinRoom(socket, store, sessionId, room.id)
        } else {
            // TODO send a special error
            socket.emit('request-error', SocketErrors.RoomNotFound)
        }
    })

    socket.on(Events.LEAVE_ROOM, async ({ sessionId, roomId }) => {
        await handleLeaveRoom(socket, store, sessionId, roomId)
    })

    socket.on(Events.SEND_MESSAGE, async ({ message, userId, roomId }) => {
        if (message && userId && roomId) {
            store.dispatch(sendMessage(message, userId, roomId))
            await blastRoom(roomId, socket, store)
        }
    })

    socket.on(Events.READY_USER, async ({ userId, roomId }) => {
        if (userId && roomId) {
            store.dispatch(readyUser(userId, roomId))
            const room: SocketRoom = store.getState().rooms.find((r: SocketRoom) => r.id === roomId)
            if (room.readyUserIds.size === room.sessionLimit) {
                store.dispatch(battleInitializeState(roomId, store.getState().sessions))
            }
            await blastRoom(roomId, socket, store)
        }
    })

    socket.on(Events.CANCEL_READY, async ({ userId, roomId }) => {
        if (userId && roomId) {
            store.dispatch(cancelReady(userId, roomId))
            await blastRoom(roomId, socket, store)
        }
    })

    socket.on(Events.BATTLE_SET_SKILL, async ({ userId, skillId, characterId, roomId }) => {
        if (userId && skillId && roomId) {
            store.dispatch(battleSetSkill(roomId, userId, skillId, characterId))
            // check if all skills are added and progress the battle
            let room: SocketRoom = store.getState().rooms.find((r: SocketRoom) => r.id === roomId)
            if (room.battle.turn.skillIds.size === room.battle.partyLimit) {
                store.dispatch(battleExecuteMain(roomId))
                room = store.getState().rooms.find((r: SocketRoom) => r.id === roomId)
                const usersToRequestNewHero = room.battle.turn.checkActiveCharacters(room.battle.parties)
                if (usersToRequestNewHero.size > 0) {
                    // send a new emit to each user asking for a new active character to sub in
                    usersToRequestNewHero.forEach(async userId => {
                        // TODO: set some request data onto the room somewhere
                        store.dispatch(addUserRequest('NEW_ACTIVE_CHARACTER', userId, roomId, {}))
                        await blastRoom(roomId, socket, store, userId)
                    })
                }
                else {
                    store.dispatch(battleExecuteUpkeep(roomId))
                    await blastRoom(roomId, socket, store)
                }
            }
        }
    })
}
