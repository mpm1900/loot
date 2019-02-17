import { Socket } from 'socket.io'
import { Store } from 'redux'
import { SocketRoom, SocketRoomPublicVisibility } from '../state/reducers/rooms.state'
import * as Utils from '../util'
import { SocketErrors } from '../types'
import { createRoom, joinRoom, removeSessionFromRooms, leaveRooms, removeEmptyRooms, sendMessage, readyUser, cancelReady, battleInitializeState, battleSetSkill } from '../state/actions/rooms.actions'
import { partyUpdateActiveCharacterId } from '../state/actions/sessions.actions'
import { blastSession } from './session'

export const Events = {
    SET_STATE: 'initialize-state__room',
}

export const blastRoom = async (roomId: string, socket: Socket, store: Store) => {
    const room = store.getState().rooms.filter((r: SocketRoom) => r.id === roomId).first()
    if (room) {
        const state = Utils.serializeRoom(await Utils.populateRoom(room, store.getState().sessions))
        socket.emit(Events.SET_STATE, { state })
        socket.to(room.id).emit(Events.SET_STATE, { state })
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
    rooms.forEach(async r => {
        if (!r) return
        socket.to(r.id).emit(Events.SET_STATE, {
            state: Utils.serializeRoom(await Utils.populateRoom(r, sessions))
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
    socket.on('room__request-create-room', async ({ sessionId }) => {
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

    socket.on('room__request-join-room', async ({ sessionId, roomId }) => {
        const room = Utils.findRoomById(store.getState().rooms, roomId)
        if (room) {
            handleJoinRoom(socket, store, sessionId, room.id)
        } else {
            socket.emit('request-error', SocketErrors.RoomNotFound)
        }
    })

    socket.on('room__request-find-room', async ({ sessionId }) => {
        const room = store.getState().rooms
            .filter((r: SocketRoom) => (
                r.userIds.size == 1 &&
                r.settings.visibility === SocketRoomPublicVisibility.Open
            ))
            .first()

        if (room) {
            handleJoinRoom(socket, store, sessionId, room.id)
        } else {
            // TODO send a special error
            socket.emit('request-error', SocketErrors.RoomNotFound)
        }
    })

    socket.on('room__request-leave-room', async ({ sessionId, roomId }) => {
        await handleLeaveRoom(socket, store, sessionId, roomId)
    })

    socket.on('room__request-send-message', async ({ message, userId, roomId }) => {
        if (message && userId && roomId) {
            store.dispatch(sendMessage(message, userId, roomId))
            await blastRoom(roomId, socket, store)
        }
    })

    socket.on('room__request-ready-user', async ({ userId, roomId }) => {
        if (userId && roomId) {
            store.dispatch(readyUser(userId, roomId))
            const room: SocketRoom = store.getState().rooms.find((r: SocketRoom) => r.id === roomId)
            if (room.readyUserIds.size === room.sessionLimit) {
                store.dispatch(battleInitializeState(roomId, store.getState().sessions))
            }
            await blastRoom(roomId, socket, store)
        }
    })

    socket.on('room__request-cancel-ready', async ({ userId, roomId }) => {
        if (userId && roomId) {
            store.dispatch(cancelReady(userId, roomId))
            await blastRoom(roomId, socket, store)
        }
    })

    socket.on('room__request-battle-set-skill', async ({ userId, skillId, characterId, roomId }) => {
        if (userId && skillId && roomId) {
            store.dispatch(battleSetSkill(roomId, userId, skillId, characterId))
            // check if all skills are added and progress the battle
            console.log('set skill', skillId)
            await blastRoom(roomId, socket, store)
        }
    })
}
