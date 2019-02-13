import * as AuthActions from '../actions/auth.actions'
import * as SessionActions from '../actions/session.actions'
import * as RoomActions from '../actions/room.actions'

const handleAuthAction = (state, action, socket) => {
    switch (action.type) {
        case AuthActions.LOGIN: {
            const username = action.payload.username
            const password = action.payload.password
            socket.emit('connection-auth', { username, password })
            break;
        }
        case AuthActions.SIGNUP: {
            const username = action.payload.username
            const password = action.payload.password
            socket.emit('connection-create', { username, password })
            break;
        }
    }
}

const handleSessionAction = (state, action, socket) => {
    switch (action.type) {
        case SessionActions.PARTY_UPDATE_ACTIVE_CHARACTER_ID: {
            socket.emit('session__party__update-active-character-id', {
                sessionId: state.session.sessionId,
                characterId: action.payload.characterId
            })
            break
        }
        case SessionActions.PARTY_SWAP_CHARACTERS: {
            socket.emit('session__party__swap-characters', {
                sessionId: state.session.sessionId,
                aIndex: action.payload.aIndex,
                bIndex: action.payload.bIndex,
            })
            break
        }
        case SessionActions.PARTY_UPDATE_CHARACTER: {
            socket.emit('session__party__update-character', {
                sessionId: state.session.sessionId,
                character: action.payload.character.serialize()
            })
            break
        }
        case SessionActions.PARTY_DELETE_CHARACTER: {
            socket.emit('session__party__delete-character', {
                sessionId: state.session.sessionId,
                characterId: action.payload.characterId,
            })
            break
        }
        case SessionActions.PARTY_ADD_CHARACTER: {
            socket.emit('session__party__add-character', {
                sessionId: state.session.sessionId,
                characterId: action.payload.characterId,
            })
        }
    }
}

const handleRoomAction = (state, action, socket) => {
    switch (action.type) {
        case RoomActions.REQUEST_CREATE_ROOM: {
            socket.emit('room__request-create-room', {
                sessionId: state.session.sessionId,
            })
            break
        }
        case RoomActions.REQUEST_JOIN_ROOM: {
            socket.emit('room__request-join-room', {
                sessionId: state.session.sessionId,
                roomId: action.payload.roomId,
            })
            break
        }
        case RoomActions.REQUEST_FIND_ROOM: {
            socket.emit('room__request-find-room', {
                sessionId: state.session.sessionId,
            })
            break
        }
        case RoomActions.REQUEST_LEAVE_ROOM: {
            socket.emit('room__request-leave-room', {
                sessionId: state.session.sessionId,
                roomId: state.room.id,
            })
            break
        }
        case RoomActions.SEND_MESSAGE: {
            if (action.payload.message) {
                socket.emit('room__request-send-message', {
                    message: action.payload.message,
                    userId: state.session.userId,
                    roomId: state.room.id,
                })
            }
            break
        }
        case RoomActions.READY_USER: {
            socket.emit('room__request-ready-user', {
                userId: state.session.userId,
                roomId: state.room.id,
            })
            break
        }
        case RoomActions.CANCEL_READY: {
            socket.emit('room__request-cancel-ready', {
                userId: state.session.userId,
                roomId: state.room.id,
            })
        }
    }
}

export default (socket) => {
    return ({ getState, dispatch }) => next => action => {
        console.log('SOCKET', action)
        const state: any = getState()
        handleAuthAction(state, action, socket)
        handleSessionAction(state, action, socket)
        handleRoomAction(state, action, socket)
        if (action.socket) {
            return next(action)
        }
    }
}