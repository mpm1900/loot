import { List } from 'immutable'
import * as Actions from '../actions/room.actions'
import * as Core from '../core/room.core'
import { ClientReduxAction } from '../actions';
import { sClientSession, iClientSession } from './session.state';

export type sClientRoom = {
    id: string,
    creatorId: string,
    users: any[],
    readyUserIds: string[],
    spectators: any[]
    playerSessions: sClientSession[],
    messages: any[],
    connected: boolean,
}
export type iClientRoom = {
    id: string,
    creatorId: string,
    users: List<any>,
    readyUserIds: List<string>,
    spectators: List<any>,
    playerSessions: List<iClientSession>,
    messages: List<any>,
    connected: boolean,
}
export const defaultClientRoom: iClientRoom = {
    id: '',
    creatorId: '',
    users: List(),
    readyUserIds: List(),
    spectators: List(),
    playerSessions: List<iClientSession>(),
    messages: List(),
    connected: false,
}

export type ClientRoomState = iClientRoom
const INITIAL_STATE: ClientRoomState = defaultClientRoom

export const RoomReducer = (state: ClientRoomState = INITIAL_STATE, action: ClientReduxAction): ClientRoomState => {
    switch (action.type) {
        case Actions.SET_STATE: return Core.setState(state, action)
        case Actions.SEND_MESSAGE: return Core.sendMessage(state, action)
        default: return state
    }
}