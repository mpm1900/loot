import { List } from 'immutable'
import * as Actions from '../actions/session.actions'
import * as Core from '../core/session.core'
import { Character, sCharacter } from '../../types/character';
import { Item, sItem } from '../../types/item';
import { Party, sParty } from '../../types/party';
import { Pack, sPack } from '../../types/pack';
import { ClientReduxAction } from '../actions';

export type sClientSession = {
    id: string,
    socketId: string,
    userId: string,
    characters: sCharacter[],
    items: sItem[],
    packs: sPack[],
    party: sParty,
}
export type iClientSession = {
    id: string
    userId: string,
    socketId: string,
    characters: List<Character>,
    items: List<Item>,
    packs: List<Pack>,
    party: Party,
}
export const defaultClientSession: iClientSession = {
    id: '',
    userId: '',
    socketId: '',
    characters: List<Character>(),
    items: List<Item>(),
    packs: List<Pack>(),
    party: new Party(),
}

export type ClientSessionState = iClientSession
const INITIAL_STATE: ClientSessionState = defaultClientSession

export const SessionReducer = (state: ClientSessionState = INITIAL_STATE, action: ClientReduxAction): ClientSessionState => {
    // console.log('SESSION -', action.type)
    switch (action.type) {
        case Actions.SET_STATE: return Core.setState(state, action)
        default: return state
    }
}