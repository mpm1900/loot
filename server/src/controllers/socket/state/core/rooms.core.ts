import { List, Map } from 'immutable'
import { SocketRoomsState, SocketRoom } from '../reducers/rooms.state'
import { SocketReduxAction } from '../actions';
import shortid from 'shortid';

export const createRoom = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.push({
        id: shortid.generate(),
        playerSessionIds: List<string>(),
        userIds: List<string>(),
        spectatorIds: List<string>(),
        messages: List<any>(),
    })
}

export const deleteRoom = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.filter(room => room.id !== action.payload.roomId)
}

export const joinRoomAsUser = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const index = state.map(room => room.id).indexOf(action.payload.roomId)
    if (index === -1) return state
    return state.update(index, room => ({
        ...room,
        userIds: room.userIds.push(action.payload.userId),
        playerSessionIds: room.playerSessionIds.push(action.payload.sessionId)
    }))
}

export const joinRoomAsSpectator = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const index = state.map(room => room.id).indexOf(action.payload.roomId)
    if (index === -1) return state
    return state.update(index, room => ({
        ...room,
        spectatorIds: room.spectatorIds.push(action.payload.userId),
    }))
}

export const leaveAllRooms = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.map(room => ({
        ...room,
        userIds: room.userIds.filter(uid => uid !== action.payload.userId),
        spectatorIds: room.spectatorIds.filter(uid => uid !== action.payload.userId),
    }))
}

export const removeSessionFromRooms = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.map(room => ({
        ...room,
        playerSessionIds: room.playerSessionIds.filter(sid => sid !== action.payload.sessionId)
    }))
}

export const removeEmptyRooms = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const isEmptyRoom = (room: SocketRoom) => {
        return (
            room.userIds.size === 0 &&
            room.spectatorIds.size === 0
        )
    }
    return state.filter(room => !isEmptyRoom(room))
}

export const sendMessage = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const index = state.map(room => room.id).indexOf(action.payload.roomId)
    if (index === -1) return state
    return state.update(index, (room: SocketRoom) => {
        console.log(room);
        return {
            ...room,
            messages: room.messages.push({
                userId: action.payload.userId,
                message: action.payload.message,
            })
        }
    })
}