import { List } from 'immutable'
import * as Actions from '../actions/room.actions'
import * as Core from '../core/room.core'
import { Character, sCharacter } from '../../types/character';
import { Item, sItem } from '../../types/item';
import { Party, sParty } from '../../types/party';
import { Pack, sPack } from '../../types/pack';
import { ClientReduxAction } from '../actions';
import { sClientSession, iClientSession } from './session.state';

export type sClientRoom = {
    id: string,
    users: any[],
    spectators: any[]
    playerSessions: sClientSession[],
    messages: any[],
    connected: boolean,
}
export type iClientRoom = {
    id: string,
    users: List<any>,
    spectators: List<any>,
    playerSessions: List<iClientSession>,
    messages: List<any>,
    connected: boolean,
}
export const defaultClientRoom: iClientRoom = {
    id: '',
    users: List(),
    spectators: List(),
    playerSessions: List<iClientSession>(),
    messages: List(),
    connected: false,
}

export type ClientRoomState = iClientRoom
const INITIAL_STATE: ClientRoomState = defaultClientRoom

export const RoomReducer = (state: ClientRoomState = INITIAL_STATE, action: ClientReduxAction): ClientRoomState => {
    // console.log('ROOM -', action.type)
    switch (action.type) {
        case Actions.SET_STATE: return Core.setState(state, action)
        case Actions.SEND_MESSAGE: return Core.sendMessage(state, action)
        default: return state
    }
}