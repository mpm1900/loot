import { List } from 'immutable'
import { SocketSession } from '../reducers/sessions.state'

export const PREFIX = 'ROOMS'
export const CREATE_ROOM = PREFIX + '_CREATE_ROOM'
export const DELETE_ROOM = PREFIX + '_DELETE_ROOM'
export const JOIN_ROOM = PREFIX + '_JOIN_ROOM'
export const LEAVE_ALL_ROOMS = PREFIX + '_LEAVE_ALL_ROOMS'
export const REMOVE_SESSION_FROM_ROOMS = PREFIX + '_REMOVE_SESSION_FROM_ROOMS'
export const REMOVE_EMPTY_ROOMS = PREFIX + '_REMOVE_EMPTY_ROOMS'
export const SEND_MESSAGE = PREFIX + '_SEND_MESSAGE'
export const ADD_USER_REQUEST = PREFIX + '_ADD_USER_REQUEST'
export const READY_USER = PREFIX + '_READY_USER'
export const CANCEL_READY = PREFIX + '_CANCEL_READY'
export const BATTLE_INIT_STATE = PREFIX + '_BATTLE_INIT_STATE'
export const BATTLE_SET_SKILL = PREFIX + '_BATTLE_SET_SKILL'
export const BATTLE_EXEC_MAIN = PREFIX + '_BATTLE_EXEC_MAIN'
export const BATTLE_EXEC_UPKEEP = PREFIX + '_BATTLE_EXEC_UPKEEP'


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

export const addUserRequest = (type: string, userId: string, roomId: string, payload: any) => ({
    type: ADD_USER_REQUEST,
    payload: {
        type,
        userId,
        roomId,
        payload,
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

export const battleInitializeState = (roomId: string, sessions: List<SocketSession>) => ({
    type: BATTLE_INIT_STATE,
    payload: {
        roomId,
        sessions,
    }
})

export const battleSetSkill = (roomId: string, userId: string, skillId: string, characterId: string) => ({
    type: BATTLE_SET_SKILL,
    payload: {
        roomId,
        userId,
        skillId,
        characterId,
    }
})

export const battleExecuteMain = (roomId: string) => ({
    type: BATTLE_EXEC_MAIN,
    payload: {
        roomId
    }
})

export const battleExecuteUpkeep = (roomId: string) => ({
    type: BATTLE_EXEC_UPKEEP,
    payload: {
        roomId,
    }
})