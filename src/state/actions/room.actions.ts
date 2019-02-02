import { ClientReduxAction } from ".";
import { ClientRoomState } from "../reducers/room.state";

export const PREFIX = 'ROOM_'

export const SET_STATE = PREFIX + 'SET_STATE'

export const REQUEST_CREATE_ROOM = PREFIX + 'REQUEST_CREATE_ROOM'
export const REQUEST_JOIN_ROOM = PREFIX + 'REQUEST_JOIN_ROOM'
export const REQUEST_LEAVE_ROOM = PREFIX + 'REQUEST_LEAVE_ROOM'
export const SEND_MESSAGE = PREFIX + 'SEND_MESSAGE'

export const setState = (state: ClientRoomState): ClientReduxAction => ({
    type: SET_STATE,
    socket: false,
    payload: {
        state
    }
})

export const requestCreateRoom = () => ({
    type: REQUEST_CREATE_ROOM,
    socket: false,
    payload: { }
})

export const requestJoinRoom = (roomId: string) => ({
    type: REQUEST_JOIN_ROOM,
    socket: false,
    payload: {
        roomId,
    }
})

export const requestLeaveRoom = () => ({
    type: REQUEST_LEAVE_ROOM,
    socket: false,
    payload: { }
})

export const sendMessage = (message: string) => ({
    type: SEND_MESSAGE,
    socket: false,
    payload: { 
        message,
    }
})