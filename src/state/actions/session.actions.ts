import { Pack } from '../../types/pack'
import { Character } from '../../types/character';
import { Item } from '../../types/item';
import { ClientReduxAction } from '.';
import { ClientSessionState } from '../reducers/session.state';

export const PREFIX = 'SESSION'
export const SET_STATE = PREFIX + '_SET_STATE'
export const ADD_PACK = PREFIX + '_ADD_PACK'
export const DELETE_PACK = PREFIX + '_DELETE_PACK'
export const ADD_CHARACTER = PREFIX + '_ADD_CHARACTER'
export const DELETE_CHARACTER = PREFIX + '_DELETE_CHARACTER'
export const ADD_ITEM = PREFIX + '_ADD_ITEM'
export const DELETE_ITEM = PREFIX + '_DELETE_ITEM'

export const PARTY_ADD_CHARACTER = PREFIX + '_PARTY_ADD_CHARACTER'
export const PARTY_DELETE_CHARACTER = PREFIX + '_PARTY_DELETE_CHARACTER'
export const PARTY_UPDATE_CHARACTER = PREFIX + '_PARTY_UPDATE_CHARACTER'
export const PARTY_SWAP_CHARACTERS = PREFIX + '_PARTY_SWAP_CHARACTERS'
export const PARTY_UPDATE_ACTIVE_CHARACTER_ID = PREFIX + '_PARTY_UPDATE_ACTIVE_CHARACTER_ID'

export const setState = (state: ClientSessionState): ClientReduxAction => ({
    type: SET_STATE,
    socket: false,
    payload: {
        state
    }
})

export const partyAddCharacter = (characterId: string): ClientReduxAction => ({
    type: PARTY_ADD_CHARACTER,
    socket: false,
    payload: {
        characterId,
    }
})
export const partyDeleteCharacter = (characterId: string): ClientReduxAction => ({
    type: PARTY_DELETE_CHARACTER,
    socket: false,
    payload: {
        characterId,
    }
})
export const partyUpdateCharacter = (character: Character): ClientReduxAction => ({
    type: PARTY_UPDATE_CHARACTER,
    socket: false,
    payload: {
        character,
    }
})
export const partySwapCharacters = (aIndex: number, bIndex: number): ClientReduxAction => ({
    type: PARTY_SWAP_CHARACTERS,
    socket: false,
    payload: {
        aIndex,
        bIndex,
    }
})
export const partyUpdateActiveCharacterId = (characterId: string): ClientReduxAction => ({
    type: PARTY_UPDATE_ACTIVE_CHARACTER_ID,
    socket: false,
    payload: {
        characterId,
    }
})

export const addPack = (pack: Pack): ClientReduxAction => ({
    type: ADD_PACK,
    socket: false,
    payload: {
        pack
    }
})

export const deletePack = (packId: string): ClientReduxAction => ({
    type: DELETE_PACK,
    socket: false,
    payload: {
        packId,
    }
})

export const addCharacter = (character: Character): ClientReduxAction => ({
    type: ADD_CHARACTER,
    socket: false,
    payload: {
        character
    }
})

export const deleteCharacter = (characterId: string): ClientReduxAction => ({
    type: DELETE_CHARACTER,
    socket: false,
    payload: {
        characterId,
    }
})

export const addItem = (item: Item): ClientReduxAction => ({
    type: ADD_ITEM,
    socket: false,
    payload: {
        item,
    }
})

export const deleteItem = (itemId: string): ClientReduxAction => ({
    type: DELETE_ITEM,
    socket: false,
    payload: {
        itemId,
    }
})