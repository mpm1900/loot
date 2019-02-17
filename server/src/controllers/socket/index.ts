import socketIO, { Socket, Server as SocketServer } from 'socket.io'
import { Server } from 'http';
import { makeStore } from './state'
import * as Utils from './util'
import { Store } from 'redux'
import { UserModel, IUserModel } from '../../models/user'
import * as UserModelUtils from '../../models/user/user.util'
import { createSession, addPack, addCharacter, addItem } from './state/actions/sessions.actions'
import { BasicCharacterPack } from '../../objects/packs'
import { EquipItem } from '../../objects/equipItem'
import { Mario, AnimeLady } from '../../objects/characters/mario.character'
import { SocketSession } from './state/reducers/sessions.state'
import { Shrek } from '../../objects/characters/shrek.character'
import { DonaldDuck } from '../../objects/characters/duck.character'
import { Pikachu } from '../../objects/characters/pikachu.character'
import { SocketErrors } from './types'
import { PontiffSulyvahn } from '../../objects/characters/pontif.character'
import { registerSessionSocketEvents, blastSession } from './events/session'
import { registerRoomSocketEvents, handleLeaveRooms } from './events/room';

const authorizeConnection = async (args: any, socket: Socket, store: Store) => {
    let user = await UserModel.findOne({ username: args.username, password: args.password })
    if (user) {
        // these comments allow a user to log in when a session exits (security risks)
        // const session = Utils.findSessionByUser(store.getState().sessions, user.id)
        // if (!session) {
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
    const { username, password } = args
    let user = await UserModel.findOne({ username, password })
    if (user) {
        socket.emit('request-error', { error: SocketErrors.InvalidUsername })
    } else {
        user = await UserModel.create({ username, password })
        user = await UserModelUtils.updateUserSocketId(user.id, socket.id)
        startConnection(socket, store, user)
    }
}

const startConnection = async (socket: Socket, store: Store, user: IUserModel) => {
    store.dispatch(createSession(user.id, socket.id))
    const session = Utils.findSessionByUser(store.getState().sessions, user.id)
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
    blastSession(session.id, socket, store, false)
}

const registerSocketActions = async (socket: Socket, store: Store) => {
    await registerSessionSocketEvents(socket, store)
    await registerRoomSocketEvents(socket, store)
}

export default (server: Server) => {
    const io: SocketServer = socketIO(server)
    const store = makeStore()
    io.on('connection', (socket: Socket) => {
        console.log('connection')
        socket.on('connection-auth', async ({ username, password }) => {
            await authorizeConnection({ username, password }, socket, store)
            console.log('connection-auth done')
        })
        socket.on('connection-create', async ({ username, password }) => {
            await createConnection({ username, password }, socket, store)
            console.log('connection-create done')
        })
    })
}