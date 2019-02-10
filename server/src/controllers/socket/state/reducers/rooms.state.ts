import { List } from 'immutable'
import * as Actions from '../actions/rooms.actions'
import * as Core from '../core/rooms.core'
import { SocketReduxAction } from '../actions'
import { SocketSession } from './sessions.state';
import { IUser } from '../../../../models/user';

export interface SocketRoom {
    id: string
    playerSessionIds: List<string>,
    userIds: List<string>
    spectatorIds: List<string>,
    messages: List<any>,
}
export interface PopulatedSocketRoom {
    id: string,
    playerSessions: List<SocketSession>,
    users: List<IUser>, // make this a list of users
    spectatorIds: List<string>,
    messages: List<any>,
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
        default: return state
    }
}