import * as RoomActions from '../../actions/room.actions'

export const handleRoomAction = (state, action, socket) => {
    const sessionId = state.session.sessionId
    const roomId = state.room.id
    const userId = state.session.userId
    switch (action.type) {
        case RoomActions.REQUEST_CREATE_ROOM: {
            socket.emit('room__request-create-room', {
                sessionId,
            })
            break
        }
        case RoomActions.REQUEST_JOIN_ROOM: {
            socket.emit('room__request-join-room', {
                sessionId,
                roomId: action.payload.roomId,
            })
            break
        }
        case RoomActions.REQUEST_FIND_ROOM: {
            socket.emit('room__request-find-room', {
                sessionId,
            })
            break
        }
        case RoomActions.REQUEST_LEAVE_ROOM: {
            socket.emit('room__request-leave-room', {
                sessionId,
                roomId,
            })
            break
        }
        case RoomActions.SEND_MESSAGE: {
            if (action.payload.message) {
                socket.emit('room__request-send-message', {
                    message: action.payload.message,
                    userId,
                    roomId,
                })
            }
            break
        }
        case RoomActions.READY_USER: {
            socket.emit('room__request-ready-user', {
                userId,
                roomId,
            })
            break
        }
        case RoomActions.CANCEL_READY: {
            socket.emit('room__request-cancel-ready', {
                userId,
                roomId,
            })
            break
        }
        case RoomActions.SET_SKILL: {
            socket.emit('room__request-battle-set-skill', {
                roomId,
                userId,
                skillId: action.payload.skillId,
                characterId: action.payload.characterId,
            })
        }
    }
}