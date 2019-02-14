import { List } from 'immutable'
import * as Actions from '../actions/sessions.actions'
import * as Core from '../core/sessions.core'
import { Character, sCharacter } from '../../../../types/character';
import { Item, sItem } from '../../../../types/item';
import { Party, sParty } from '../../../../types/party';
import { Pack, sPack } from '../../../..//types/pack';
import { SocketReduxAction } from '../actions';

export type sSocketSession = {
    id: string,
    socketId: string,
    userId: string,
    characters: sCharacter[],
    items: sItem[],
    packs: sPack[],
    party: sParty,
}
export type SocketSession = {
    id: string
    userId: string,
    socketId: string,
    characters: List<Character>,
    items: List<Item>,
    packs: List<Pack>,
    party: Party,
}
export const defaultSocketSession: SocketSession = {
    id: '',
    userId: '',
    socketId: '',
    characters: List<Character>(),
    items: List<Item>(),
    packs: List<Pack>(),
    party: new Party(),
}

export type SocketSessionsState = List<SocketSession>
const INITIAL_STATE: SocketSessionsState = List<SocketSession>()

export default (state: SocketSessionsState = INITIAL_STATE, action: SocketReduxAction): SocketSessionsState => {
    switch (action.type) {
        case Actions.CREATE_SESSION: return Core.createSession(state, action)
        case Actions.DELETE_SESSION_BY_USER: return Core.deleteSessionByUser(state, action)
        case Actions.ADD_PACK: return Core.addPack(state, action)
        case Actions.DELETE_PACK: return Core.deletePack(state, action)
        case Actions.ADD_CHARACTER: return Core.addCharacter(state, action)
        case Actions.DELETE_CHARACTER: return Core.deleteCharacter(state, action)
        case Actions.ADD_ITEM: return Core.addItem(state, action)
        case Actions.DELETE_ITEM: return Core.deleteItem(state, action)
        case Actions.PARTY_ADD_CHARACTER: return Core.partyAddCharacter(state, action)
        case Actions.PARTY_DELETE_CHARACTER: return Core.partyDeleteCharacter(state, action)
        case Actions.PARTY_UPDATE_CHARACTER: return Core.partyUpdateCharacter(state, action)
        case Actions.PARTY_SWAP_CHARACTERS: return Core.partySwapCharacters(state, action)
        case Actions.PARTY_UPDATE_ACTIVE_CHARACTER_ID: return Core.partyUpdateActiveCharacterId(state, action)
        case Actions.PARTY_CLEAR_CHARACTERS: return Core.partyClearCharacters(state, action)
        default: return state
    }
}