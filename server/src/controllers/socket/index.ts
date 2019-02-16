import socketIO, { Socket, Server as SocketServer } from 'socket.io'
import { Server } from 'http';
import { makeStore } from './state'
import * as Utils from './util';
import { Store } from 'redux';
import { UserModel, IUserModel } from '../../models/user';
import * as UserModelUtils from '../../models/user/user.util'
import { createSession, addPack, addCharacter, addItem, partyUpdateCharacter, partyAddCharacter, partyUpdateActiveCharacterId, partySwapCharacters, partyDeleteCharacter, partyClearCharacters } from './state/actions/sessions.actions';
import { BasicCharacterPack } from '../../objects/packs';
import { EquipItem } from '../../objects/equipItem';
import { Mario, AnimeLady } from '../../objects/characters/mario.character';
import { SocketSession } from './state/reducers/sessions.state';
import { Shrek } from '../../objects/characters/shrek.character';
import { DonaldDuck } from '../../objects/characters/duck.character';
import { Pikachu } from '../../objects/characters/pikachu.character';
import { Character } from '../../types/character';
import { createRoom, joinRoom, removeSessionFromRooms, leaveRooms, removeEmptyRooms, sendMessage, readyUser, cancelReady, initializeBattleState } from './state/actions/rooms.actions';
import { SocketRoom, SocketRoomPublicVisibility } from './state/reducers/rooms.state'
import { SocketErrors } from './types'
import { PontiffSulyvahn } from '../../objects/characters/pontif.character';

const authorizeConnection = async (args: any, socket: Socket, store: Store) => {
    console.log('authorizing connection...')
    let user = await UserModel.findOne({ username: args.username, password: args.password })
    console.log('user found...')
    if (user) {
        const session = Utils.findSessionByUser(store.getState().sessions, user.id)
        // these comments allow a user to log in when a session exits (security risks)
        // if (!session) {
            console.log('session found.')
            console.log('updating user...')
            user = await UserModelUtils.updateUserSocketId(user.id, socket.id)
            startConnection(socket, store, user)
        // } else {
        //    socket.emit('request-error', { error: SocketErrors.UserLoggedIn })
        // }
    } else {
        socket.emit('request-error', { error: SocketErrors.UserNotFound })
    }
}

const createConnection = async (args: any, socket: Socket, store: Store) => {
    console.log('creating fresh connection...')
    const { username, password } = args
    let user = await UserModel.findOne({ username, password })
    if (user) {
        socket.emit('request-error', { error: SocketErrors.InvalidUsername })
    } else {
        user = await UserModel.create({ username, password })
        console.log('updating user...')
        user = await UserModelUtils.updateUserSocketId(user.id, socket.id)
        startConnection(socket, store, user)
    }
}

const startConnection = async (socket: Socket, store: Store, user: IUserModel) => {
    console.log('starting socket session...')
    store.dispatch(createSession(user.id, socket.id))
    const session = Utils.findSessionByUser(store.getState().sessions, user.id)
    console.log('updating user...')
    UserModelUtils.updateUserSessionId(user.id, session.id)
    socket.on('disconnect', () => {
        handleLeaveRooms(socket, store, session.userId)
        // store.dispatch(deleteSessionByUser(user.id))
        UserModelUtils.resetSocketState(user.id)
    })
    initializeSessionState(socket, store, session)
    registerSocketActions(socket, store)
}

const initializeSessionState = async (socket: Socket, store: Store, session: SocketSession) => {
    if (session.items.size === 0) {
        console.log('initializing state...')
        const packCount = 3
        for (let i = 0; i < packCount; i++) {
            store.dispatch(addPack(session.id, BasicCharacterPack(100)))
        }
        const mario = Mario(100)
        store.dispatch(addCharacter(session.id, mario))
        const shrek = Shrek(100)
        store.dispatch(addCharacter(session.id, shrek))
        const dd =  DonaldDuck(100)
        store.dispatch(addCharacter(session.id, dd))
        const pika = Pikachu(100)
        store.dispatch(addCharacter(session.id, pika))
        const animelady = AnimeLady(100)
        store.dispatch(addCharacter(session.id, animelady))
        const ps = PontiffSulyvahn(100)
        store.dispatch(addCharacter(session.id, ps))

        const itemCount = 70
        for (let i = 0; i < itemCount; i++) {
            const item = EquipItem(100)
            store.dispatch(addItem(session.id, item))
        }
    }
    console.log('initial session blast...')
    blastSession(session.id, socket, store, false, '/')
}

const blastSession = async (sessionId: string, socket: Socket, store: Store, blastToRooms = true, route: string = null) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        const rooms = Utils.findRoomsByUser(store.getState().rooms, session.userId)
        const sessionState = Utils.serializeSession(session);
        socket.emit('initialize-state__session', { state: sessionState })
        if (rooms && rooms.size > 0 && blastToRooms) {
            const sessions = store.getState().sessions
            rooms.forEach(async room => {
                if (room) {
                    const state =  Utils.serializeRoom(await Utils.populateRoom(room, sessions))
                    socket.emit('initialize-state__room', { state })
                    socket.to(room.id).emit('initialize-state__room', { state })
                }
            })
        }
    }
}

const blastRoom = async (roomId: string, socket: Socket, store: Store) => {
    const room = store.getState().rooms.filter((r: SocketRoom) => r.id === roomId).first()
    if (room) {
        const state = Utils.serializeRoom(await Utils.populateRoom(room, store.getState().sessions))
        socket.emit('initialize-state__room', { state })
        console.log(state);
        socket.to(room.id).emit('initialize-state__room', { state })
    }
}

const registerSessionSocketActions = async (socket: Socket, store: Store) => {
    socket.on('session__party__update-active-character-id', ({ sessionId, characterId }) => {
        store.dispatch(partyUpdateActiveCharacterId(sessionId, characterId))
        blastSession(sessionId, socket, store, false)
    })

    socket.on('session__party__update-character', ({ sessionId, character }) => {
        store.dispatch(partyUpdateCharacter(sessionId, Character.deserialize(character)))
        blastSession(sessionId, socket, store)
    })

    socket.on('session__party__swap-characters', ({ sessionId, aIndex, bIndex }) => {
        store.dispatch(partySwapCharacters(sessionId, aIndex, bIndex))
        blastSession(sessionId, socket, store)
    })

    socket.on('session__party__delete-character', ({ sessionId, characterId }) => {
        store.dispatch(partyDeleteCharacter(sessionId, characterId))
        blastSession(sessionId, socket, store)
    })

    socket.on('session__party__add-character', ({ sessionId, characterId }) => {
        store.dispatch(partyAddCharacter(sessionId, characterId))
        blastSession(sessionId, socket, store)
    })

    socket.on('session__party__equip-item', ({ sessionId, characterId, itemId }) => {
        console.log(sessionId, characterId, itemId)
    })

    socket.on('session__party__clear-characters', ({ sessionId }) => {
        store.dispatch(partyClearCharacters(sessionId))
        blastSession(sessionId, socket, store)
    })
}

const handleLeaveRooms = async (socket: Socket, store: Store, userId: string) => {
    let rooms = Utils.findRoomsByUser(store.getState().rooms, userId)
    store.dispatch(leaveRooms(userId))
    store.dispatch(removeEmptyRooms())
    store.dispatch(removeSessionFromRooms(Utils.findSessionIdByUser(store.getState().sessions, userId)))
    const sessions = store.getState().sessions
    rooms = rooms.map(room => Utils.findRoomById(store.getState().rooms, room.id))
    rooms.forEach(async r => {
        if (r) socket.to(r.id).emit('initialize-state__room', { state: Utils.serializeRoom(await Utils.populateRoom(r, sessions)) })
    })
}

const handleLeaveRoom = async (socket: Socket, store: Store, sessionId: string, roomId: string) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        socket.leave(roomId)
        store.dispatch(leaveRooms(session.userId))
        store.dispatch(removeEmptyRooms())
        store.dispatch(removeSessionFromRooms(sessionId))
        await blastRoom(roomId, socket, store)
    }
}

const handleJoinRoom = async (socket: Socket, store: Store, sessionId: string, roomId: string) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    handleLeaveRooms(socket, store, session.userId)
    store.dispatch(joinRoom(roomId, session.userId, session.id))
    socket.join(roomId)
    await blastRoom(roomId, socket, store)
}

const registerRoomSocketActions = async (socket: Socket, store: Store) => {
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
            if (room.readyUserIds.size === 2) {
                console.log('start battle')
                store.dispatch(initializeBattleState(roomId, store.getState().sessions))
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
}

const registerSocketActions = async (socket: Socket, store: Store) => {
    await registerSessionSocketActions(socket, store)
    await registerRoomSocketActions(socket, store)
}

export default (server: Server) => {
    const io: SocketServer = socketIO(server)
    const store = makeStore()
    io.on('connection', (socket: Socket) => {
        console.log('connection')
        socket.on('connection-auth', async ({ username, password }) => {
            await authorizeConnection({ username, password }, socket, store)
            console.log('connection done')
        })
        socket.on('connection-create', async ({ username, password }) => {
            await createConnection({ username, password }, socket, store)
        })
    })
}