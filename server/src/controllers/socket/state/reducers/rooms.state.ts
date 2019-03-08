import { List, Map } from 'immutable'
import * as Actions from '../actions/rooms.actions'
import * as Core from '../core/rooms.core'
import { SocketReduxAction } from '../actions'
import { SocketSession } from './sessions.state'
import { IUser } from '../../../../models/user'
import { BattleState } from '../../../../types/battle'

export enum SocketRoomPublicVisibility {
    Open,
    Restricted,
    Locked,
}
export interface SocketRoomSettings {
    visibility: SocketRoomPublicVisibility
}

export interface SocketUserRequest {
    type: string,
    userId: string,
    payload: any,
}

export interface SocketRoom {
    id: string
    creatorId: string,
    playerSessionIds: List<string>,
    sessionLimit: number,
    userIds: List<string>,
    readyUserIds: List<string>,
    spectatorIds: List<string>,
    messages: List<any>,
    settings: SocketRoomSettings,
    battle: BattleState,
    userRequests: Map<string, List<SocketUserRequest>>,
}
export interface PopulatedSocketRoom {
    id: string,
    creatorId: string, // this can be a user if needed
    playerSessions: List<SocketSession>,
    sessionLimit: number,
    users: List<IUser>,
    readyUserIds: List<string>,
    spectatorIds: List<string>,
    messages: List<any>,
    settings: SocketRoomSettings,
    battle: BattleState,
    userRequests: Map<string, List<SocketUserRequest>>,
}

export type SocketRoomsState = List<SocketRoom>
const INITIAL_STATE: SocketRoomsState = List<SocketRoom>()

export default (state: SocketRoomsState = INITIAL_STATE, action: SocketReduxAction): SocketRoomsState => {
    // console.log(action)
    switch (action.type) {
        case Actions.CREATE_ROOM: return Core.createRoom(state, action)
        case Actions.DELETE_ROOM: return Core.deleteRoom(state, action)
        case Actions.JOIN_ROOM: return Core.joinRoomAsUser(state, action)
        case Actions.LEAVE_ALL_ROOMS: return Core.leaveAllRooms(state, action)
        case Actions.REMOVE_SESSION_FROM_ROOMS: return Core.removeSessionFromRooms(state, action)
        case Actions.REMOVE_EMPTY_ROOMS: return Core.removeEmptyRooms(state, action)
        case Actions.SEND_MESSAGE: return Core.sendMessage(state, action)
        case Actions.READY_USER: return Core.readyUser(state, action)
        case Actions.CANCEL_READY: return Core.cancelReady(state, action)
        case Actions.BATTLE_INIT_STATE: return Core.battleInitializeState(state, action)
        case Actions.BATTLE_SET_SKILL: return Core.battleSetSkill(state, action)
        case Actions.BATTLE_EXEC_MAIN: return Core.battleExecuteMain(state, action)
        case Actions.BATTLE_EXEC_UPKEEP: return Core.battleExecuteUpkeep(state, action)
        default: return state
    }
}