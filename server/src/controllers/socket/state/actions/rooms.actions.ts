import { List } from 'immutable'
import { Party } from '../../../../types/party'
import { SocketSession } from '../reducers/sessions.state';

export const PREFIX = 'ROOMS'
export const CREATE_ROOM = PREFIX + '_CREATE_ROOM'
export const DELETE_ROOM = PREFIX + '_DELETE_ROOM'
export const JOIN_ROOM = PREFIX + '_JOIN_ROOM'
export const LEAVE_ALL_ROOMS = PREFIX + '_LEAVE_ALL_ROOMS'
export const REMOVE_SESSION_FROM_ROOMS = PREFIX + '_REMOVE_SESSION_FROM_ROOMS'
export const REMOVE_EMPTY_ROOMS = PREFIX + '_REMOVE_EMPTY_ROOMS'
export const SEND_MESSAGE = PREFIX + '_SEND_MESSAGE'
export const READY_USER = PREFIX + '_READY_USER'
export const CANCEL_READY = PREFIX + '_CANCEL_READY'
export const INIT_BATTLE_STATE = PREFIX + '_INIT_BATTLE_STATE'

export const createRoom = (userId: string = null) => ({
    type: CREATE_ROOM,
    payload: {
        userId,
    }
})

export const deleteRoom = (roomId: string) => ({
    type: DELETE_ROOM,
    payload: {
        roomId,
    }
})

export const joinRoom = (roomId: string, userId: string, sessionId: string) => ({
    type: JOIN_ROOM,
    payload: {
        roomId,
        userId,
        sessionId,
    }
})

export const leaveRooms = (userId: string) => ({
    type: LEAVE_ALL_ROOMS,
    payload: {
        userId,
    }
})

export const removeSessionFromRooms = (sessionId: string) => ({
    type: REMOVE_SESSION_FROM_ROOMS,
    payload: {
        sessionId,
    }
})

export const removeEmptyRooms = () => ({
    type: REMOVE_EMPTY_ROOMS,
})

export const sendMessage = (message: string, userId: string, roomId: string) => ({
    type: SEND_MESSAGE,
    payload: {
        message,
        userId,
        roomId,
    }
})

export const readyUser = (userId: string, roomId: string) => ({
    type: READY_USER,
    payload: {
        userId,
        roomId,
    }
})

export const cancelReady = (userId: string, roomId: string) => ({
    type: CANCEL_READY,
    payload: {
        userId,
        roomId,
    }
})

export const initializeBattleState = (roomId: string, sessions: List<SocketSession>) => ({
    type: INIT_BATTLE_STATE,
    payload: {
        roomId,
        sessions,
    }
})