import socketIO, { Socket, Server as SocketServer } from 'socket.io'
import { Server } from 'http';
import { makeStore } from './state'
import * as Utils from './util';
import { Store } from 'redux';
import { UserModel, IUserModel } from '../../models/user';
import * as UserModelUtils from '../../models/user/user.util'
import { createSession, deleteSessionByUser, addPack, addCharacter, addItem, partyUpdateCharacter, partyAddCharacter, partyAddItem, partyDeleteItem, partyUpdateActiveCharacterId } from './state/actions/sessions.actions';
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
        console.log('disconnecting user')
        // this is finding the original room, that was not removed
        // because when joining this room, the other room was not "left" and cleaned up
        handleLeaveRooms(io, store, session.userId)
        store.dispatch(deleteSessionByUser(user.id))
        UserModelUtils.resetSocketState(user.id)
        console.log('connected users', store.getState().sessions.size)
    })
    initializeSessionState(socket, store, session)
    registerSocketActions(io, socket, store)
}

const initializeSessionState = async (socket: Socket, store: Store, session: SocketSession) => {
    const packCount = 3
    for (let i = 0; i < packCount; i++) {
        store.dispatch(addPack(session.id, BasicCharacterPack(100)))
    }
    const mario = Mario(100)
    store.dispatch(addCharacter(session.id, mario))
    store.dispatch(partyAddCharacter(session.id, mario.withRandomItems()))
    store.dispatch(partyUpdateActiveCharacterId(session.id, mario.__uuid))
    const shrek = Shrek(100)
    store.dispatch(addCharacter(session.id, shrek))
    store.dispatch(partyAddCharacter(session.id, shrek.withRandomItems()))
    const dd =  DonaldDuck(100).withRandomItems()
    store.dispatch(addCharacter(session.id, dd))
    store.dispatch(partyAddCharacter(session.id, dd.withRandomItems()))
    const animelady = AnimeLady(100)
    store.dispatch(addCharacter(session.id, animelady))
    store.dispatch(partyAddCharacter(session.id, animelady.withRandomItems()))
    const pika = Pikachu(100)
    store.dispatch(addCharacter(session.id, pika))
    store.dispatch(partyAddCharacter(session.id, pika.withRandomItems()))

    const itemCount = 30
    for (let i = 0; i < itemCount; i++) {
        const item = EquipItem(100)
        store.dispatch(addItem(session.id, item))
        store.dispatch(partyAddItem(session.id, item))
    }
    session = Utils.findSessionByUser(store.getState().sessions, session.userId)
    socket.emit('initialize-state__session', { state: Utils.serializeSession(session) })
}

const registerSessionSocketActions = async (io: SocketServer, socket: Socket, store: Store) => {
    socket.on('session__party__update-active-character-id', ({ sessionId, characterId }) => {
        store.dispatch(partyUpdateActiveCharacterId(sessionId, characterId))
        const session = Utils.findSessionById(store.getState().sessions, sessionId)
        socket.emit('initialize-state__session', { state: Utils.serializeSession(session) })
    })

    socket.on('session__party__update-character', ({ sessionId, character }) => {
        store.dispatch(partyUpdateCharacter(sessionId, Character.deserialize(character)))
        const session = Utils.findSessionById(store.getState().sessions, sessionId)
        socket.emit('initialize-state__session', { state: Utils.serializeSession(session) })
    })

    socket.on('session__party__add-item', ({ sessionId, itemId }) => {
        let session = Utils.findSessionById(store.getState().sessions, sessionId)
        const item = session.items.find(item => item.__uuid === itemId)
        store.dispatch(partyAddItem(sessionId, item))
        session = Utils.findSessionById(store.getState().sessions, sessionId)
        socket.emit('initialize-state__session', { state: Utils.serializeSession(session) })
    })

    socket.on('session__party__delete-item', ({ sessionId, itemId }) => {
        store.dispatch(partyDeleteItem(sessionId, itemId))
        const session = Utils.findSessionById(store.getState().sessions, sessionId)
        socket.emit('initialize-state__session', { state: Utils.serializeSession(session) })
    })
}

const handleLeaveRooms = (io: SocketServer, store: Store, userId: string) => {
    let rooms = Utils.findRoomsByUser(store.getState().rooms, userId)
    store.dispatch(leaveRooms(userId))
    store.dispatch(removeEmptyRooms())
    const sessionId = Utils.findSessionIdByUser(store.getState().sessions, userId)
    store.dispatch(removeSessionFromRooms(sessionId))
    const sessions = store.getState().sessions
    rooms = rooms.map(room => Utils.findRoomById(store.getState().rooms, room.id)).filter(r => r)
    rooms.forEach(r => {
        io.in(r.id).emit('initialize-state__room', { state: Utils.serializeRoom(Utils.populateRoom(r, sessions)) })
    })
}

const handleLeaveRoom = (io: SocketServer, socket: Socket, store: Store, sessionId: string, roomId: string) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        socket.leave(roomId)
        store.dispatch(leaveRooms(session.userId))
        store.dispatch(removeEmptyRooms())
        store.dispatch(removeSessionFromRooms(sessionId))
        const room = Utils.findRoomById(store.getState().rooms, roomId)
        if (room) io.in(room.id).emit('initialize-state__room', { state: Utils.serializeRoom(Utils.populateRoom(room, store.getState().sessions)) })
    }
}

const registerRoomSocketActions = async (io: SocketServer, socket: Socket, store: Store) => {
    socket.on('room__request-create-room', ({ sessionId }) => {
        store.dispatch(createRoom())
        let room = store.getState().rooms.filter((r: SocketRoom) => r.playerSessionIds.size === 0).first()
        const session = Utils.findSessionById(store.getState().sessions, sessionId)
        store.dispatch(joinRoom(room.id, session.userId, session.id))
        socket.join(room.id)
        room = store.getState().rooms.filter((r: SocketRoom) => r.id === room.id).first()
        const state = Utils.serializeRoom(Utils.populateRoom(room, store.getState().sessions))
        io.in(room.id).emit('initialize-state__room', { state })
    })

    socket.on('room__request-join-room', ({ sessionId, roomId }) => {
        console.log('join room', roomId, sessionId)
        let room = Utils.findRoomById(store.getState().rooms, roomId)
        if (room) {
            const session = Utils.findSessionById(store.getState().sessions, sessionId)
            handleLeaveRooms(io, store, session.userId)
            store.dispatch(joinRoom(roomId, session.userId, session.id))
            socket.join(roomId)
            room = Utils.findRoomById(store.getState().rooms, roomId)
            const state = Utils.serializeRoom(Utils.populateRoom({...room}, store.getState().sessions));
            io.in(room.id).emit('initialize-state__room', { state })
        } else {
            socket.emit('request-error', SocketErrors.RoomNotFound)
        }
    })

    socket.on('room__request-leave-room', ({ sessionId, roomId }) => {
        console.log('request leave room', sessionId)
        handleLeaveRoom(io, socket, store, sessionId, roomId)
    })

    socket.on('room__request-send-message', ({ message, userId, roomId }) => {
        console.log('send message', message, userId, roomId)
        if (message && userId && roomId) {
            const _room = Utils.findRoomById(store.getState().rooms, roomId);
            store.dispatch(sendMessage(message, userId, roomId))
            const room = Utils.findRoomById(store.getState().rooms, roomId)
            const state = Utils.serializeRoom(Utils.populateRoom(room, store.getState().sessions));
            io.in(room.id).emit('initialize-state__room', { state })
        }
    })

}

const registerSocketActions = async (io: SocketServer, socket: Socket, store: Store) => {
    registerSessionSocketActions(io, socket, store)
    registerRoomSocketActions(io, socket, store)
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