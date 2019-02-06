import socketIO, { Socket, Server as SocketServer } from 'socket.io'
import { Server } from 'http';
import { makeStore } from './state'
import * as Utils from './util';
import { Store } from 'redux';
import { UserModel, IUserModel } from '../../models/user';
import * as UserModelUtils from '../../models/user/user.util'
import { createSession, deleteSessionByUser, addPack, addCharacter, addItem, partyUpdateCharacter, partyAddCharacter, partyUpdateActiveCharacterId, partySwapCharacters } from './state/actions/sessions.actions';
import { BasicCharacterPack } from '../../objects/packs';
import { EquipItem } from '../../objects/equipItem';
import { Mario, AnimeLady } from '../../objects/characters/mario.character';
import { SocketSession } from './state/reducers/sessions.state';
import { Shrek } from '../../objects/characters/shrek.character';
import { DonaldDuck } from '../../objects/characters/duck.character';
import { Pikachu } from '../../objects/characters/pikachu.character';
import { Character } from '../../types/character';
import { createRoom, joinRoom, removeSessionFromRooms, leaveRooms, removeEmptyRooms, sendMessage } from './state/actions/rooms.actions';
import { SocketRoom } from './state/reducers/rooms.state'
import { SocketErrors } from './types'

const authorizeConnection = async (io: SocketServer, args: any, socket: Socket, store: Store) => {
    let user = await UserModel.findOne({ username: args.username, password: args.password })
    if (user) {
        const session = Utils.findSessionByUser(store.getState().sessions, user.id)
        if (!session) {
            user = await UserModelUtils.updateUserSocketId(user.id, socket.id)
            startConnection(io, socket, store, user)
        } else {
            socket.emit('request-error', { error: SocketErrors.UserLoggedIn })
        }
    } else {
        socket.emit('request-error', { error: SocketErrors.UserNotFound })
    }
}

const startConnection = async (io: SocketServer, socket: Socket, store: Store, user: IUserModel) => {
    store.dispatch(createSession(user.id, socket.id))
    const session = Utils.findSessionByUser(store.getState().sessions, user.id)
    UserModelUtils.updateUserSessionId(user.id, session.id)
    socket.on('disconnect', () => {
        handleLeaveRooms(socket, store, session.userId)
        store.dispatch(deleteSessionByUser(user.id))
        UserModelUtils.resetSocketState(user.id)
    })
    initializeSessionState(socket, store, session)
    registerSocketActions(io, socket, store)
}

const initializeSessionState = async (socket: Socket, store: Store, session: SocketSession) => {
    const packCount = 3
    for (let i = 0; i < packCount; i++) {
        store.dispatch(addPack(session.id, BasicCharacterPack(100)))
    }
    let mario = Mario(100)
    store.dispatch(addCharacter(session.id, mario))
    store.dispatch(partyAddCharacter(session.id, mario))
    store.dispatch(partyUpdateActiveCharacterId(session.id, mario.__uuid))
    const shrek = Shrek(100)
    store.dispatch(addCharacter(session.id, shrek))
    store.dispatch(partyAddCharacter(session.id, shrek))
    const dd =  DonaldDuck(100)
    store.dispatch(addCharacter(session.id, dd))
    store.dispatch(partyAddCharacter(session.id, dd))
    const pika = Pikachu(100)
    store.dispatch(addCharacter(session.id, pika))
    store.dispatch(partyAddCharacter(session.id, pika))
    const animelady = AnimeLady(100)
    store.dispatch(addCharacter(session.id, animelady))
    store.dispatch(partyAddCharacter(session.id, animelady))
    mario = Mario(100)
    store.dispatch(addCharacter(session.id, mario))
    store.dispatch(partyAddCharacter(session.id, mario))

    const itemCount = 70
    for (let i = 0; i < itemCount; i++) {
        const item = EquipItem(100)
        store.dispatch(addItem(session.id, item))
    }
    blastSession(session.id, socket, store)
}

const blastSession = (sessionId: string, socket: Socket, store: Store, blastToRooms = true) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        const rooms = Utils.findRoomsByUser(store.getState().rooms, session.userId)
        socket.emit('initialize-state__session', { state: Utils.serializeSession(session) })
        if (rooms && rooms.size > 0 && blastToRooms) {
            const sessions = store.getState().sessions
            rooms.forEach(r => {
                if (r) {
                    socket.emit('initialize-state__room', { state: Utils.serializeRoom(Utils.populateRoom(r, sessions)) })
                    socket.to(r.id).emit('initialize-state__room', { state: Utils.serializeRoom(Utils.populateRoom(r, sessions)) })
                }
            })
        }
    }
}

const blastRoom = (roomId: string, socket: Socket, store: Store) => {
    const room = store.getState().rooms.filter((r: SocketRoom) => r.id === roomId).first()
    if (room) {
        const state = Utils.serializeRoom(Utils.populateRoom(room, store.getState().sessions))
        socket.emit('initialize-state__room', { state })
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

    socket.on('session__party__equip-item', ({ sessionId, characterId, itemId }) => {
        console.log(sessionId, characterId, itemId)
    })
}

const handleLeaveRooms = (socket: Socket, store: Store, userId: string) => {
    let rooms = Utils.findRoomsByUser(store.getState().rooms, userId)
    store.dispatch(leaveRooms(userId))
    store.dispatch(removeEmptyRooms())
    store.dispatch(removeSessionFromRooms(Utils.findSessionIdByUser(store.getState().sessions, userId)))
    const sessions = store.getState().sessions
    rooms = rooms.map(room => Utils.findRoomById(store.getState().rooms, room.id))
    rooms.forEach(r => {
        if (r) socket.to(r.id).emit('initialize-state__room', { state: Utils.serializeRoom(Utils.populateRoom(r, sessions)) })
    })
}

const handleLeaveRoom = (socket: Socket, store: Store, sessionId: string, roomId: string) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        socket.leave(roomId)
        store.dispatch(leaveRooms(session.userId))
        store.dispatch(removeEmptyRooms())
        store.dispatch(removeSessionFromRooms(sessionId))
        blastRoom(roomId, socket, store)
    }
}

const registerRoomSocketActions = async (socket: Socket, store: Store) => {
    socket.on('room__request-create-room', ({ sessionId }) => {
        store.dispatch(createRoom())
        const room = store.getState().rooms.filter((r: SocketRoom) => r.playerSessionIds.size === 0).first()
        const session = Utils.findSessionById(store.getState().sessions, sessionId)
        store.dispatch(joinRoom(room.id, session.userId, session.id))
        socket.join(room.id)
        blastRoom(room.id, socket, store)
    })

    socket.on('room__request-join-room', ({ sessionId, roomId }) => {
        const room = Utils.findRoomById(store.getState().rooms, roomId)
        if (room) {
            const session = Utils.findSessionById(store.getState().sessions, sessionId)
            handleLeaveRooms(socket, store, session.userId)
            store.dispatch(joinRoom(roomId, session.userId, session.id))
            socket.join(roomId)
            blastRoom(roomId, socket, store)
        } else {
            socket.emit('request-error', SocketErrors.RoomNotFound)
        }
    })

    socket.on('room__request-leave-room', ({ sessionId, roomId }) => {
        handleLeaveRoom(socket, store, sessionId, roomId)
    })

    socket.on('room__request-send-message', ({ message, userId, roomId }) => {
        if (message && userId && roomId) {
            store.dispatch(sendMessage(message, userId, roomId))
            blastRoom(roomId, socket, store)
        }
    })
}

const registerSocketActions = async (io: SocketServer, socket: Socket, store: Store) => {
    registerSessionSocketActions(socket, store)
    registerRoomSocketActions(socket, store)
}

export default (server: Server) => {
    const io: SocketServer = socketIO(server)
    const store = makeStore()
    io.on('connection', (socket: Socket) => {
        console.log('connection')
        socket.on('connection-auth', async ({ username, password }) => {
            await authorizeConnection(io, { username, password }, socket, store)
        })
    })
}