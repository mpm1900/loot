import * as SessionActions from '../actions/session.actions';
import * as RoomActions from '../actions/room.actions';

const handleSessionAction = (state, action, socket) => {
    switch (action.type) {
        case SessionActions.PARTY_UPDATE_ACTIVE_CHARACTER_ID: {
            socket.emit('session__party__update-active-character-id', {
                sessionId: state.session.sessionId,
                characterId: action.payload.characterId
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
        case SessionActions.PARTY_ADD_ITEM: {
            socket.emit('session__party__add-item', {
                sessionId: state.session.sessionId,
                itemId: action.payload.itemId,
            })
            break
        }
        case SessionActions.PARTY_DELETE_ITEM: {
            socket.emit('session__party__delete-item', {
                sessionId: state.session.sessionId,
                itemId: action.payload.itemId
            })
            break
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
            break;
        }
        case RoomActions.REQUEST_LEAVE_ROOM: {
            console.log('WTTTFFFFF', action)
            socket.emit('room__request-leave-room', {
                sessionId: state.session.sessionId,
                roomId: state.room.id,
            })
            break;
        }
        case RoomActions.SEND_MESSAGE: {
            if (action.payload.message) {
                socket.emit('room__request-send-message', {
                    message: action.payload.message,
                    userId: state.session.userId,
                    roomId: state.room.id,
                })
            }
            break;
        }
    }
}

export default (socket) => {
    return ({ getState, dispatch }) => next => action => {
        console.log('SOCKET', action)
        const state: any = getState()
        handleSessionAction(state, action, socket)
        handleRoomAction(state, action, socket)
        if (action.socket) {
            return next(action)
        }
    }
}