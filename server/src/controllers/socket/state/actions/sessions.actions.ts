import { Pack } from '../../../../types/pack'
import { Character } from '../../../../types/character';
import { Item } from '../../../../types/item';
import { SocketReduxAction } from '.';

export const PREFIX = 'SESSIONS'
export const CREATE_SESSION = PREFIX + '_CREATE_SESSION'
export const DELETE_SESSION_BY_USER = PREFIX + '_DELETE_SESSION_BY_USER'

export const ADD_PACK = PREFIX + '_ADD_PACK'
export const DELETE_PACK = PREFIX + '_DELETE_PACK'
export const ADD_CHARACTER = PREFIX + '_ADD_CHARACTER'
export const DELETE_CHARACTER = PREFIX + '_DELETE_CHARACTER'
export const ADD_ITEM = PREFIX + '_ADD_ITEM'
export const DELETE_ITEM = PREFIX + '_DELETE_ITEM'

export const PARTY_ADD_CHARACTER = PREFIX + '_PARTY_ADD_CHARACTER'
export const PARTY_DELETE_CHARACTER = PREFIX + '_PARTY_DELETE_CHARACTER'
export const PARTY_UPDATE_CHARACTER = PREFIX + '_PARTY_UPDATE_CHARACTER'
export const PARTY_UPDATE_ACTIVE_CHARACTER_ID = PREFIX + '_PARTY_UPDATE_ACTIVE_CHARACTER_ID'
export const PARTY_ADD_ITEM = PREFIX + '_PARTY_ADD_ITEM'
export const PARTY_DELETE_ITEM = PREFIX + '_PARTY_DELETE_ITEM'

export const partyAddCharacter = (sessionId: string, character: Character): SocketReduxAction => ({
    type: PARTY_ADD_CHARACTER,
    payload: {
        sessionId,
        character,
    }
})
export const partyDeleteCharacter = (sessionId: string, characterId: string): SocketReduxAction => ({
    type: PARTY_DELETE_CHARACTER,
    payload: {
        sessionId,
        characterId,
    }
})
export const partyUpdateCharacter = (sessionId: string, character: Character): SocketReduxAction => ({
    type: PARTY_UPDATE_CHARACTER,
    payload: {
        sessionId,
        character,
    }
})
export const partyUpdateActiveCharacterId = (sessionId: string, characterId: string): SocketReduxAction => ({
    type: PARTY_UPDATE_ACTIVE_CHARACTER_ID,
    payload: {
        sessionId,
        characterId,
    }
})
export const partyAddItem = (sessionId: string, item: Item): SocketReduxAction => ({
    type: PARTY_ADD_ITEM,
    payload: {
        sessionId,
        item,
    }
})
export const partyDeleteItem = (sessionId: string, itemId: string): SocketReduxAction => ({
    type: PARTY_DELETE_ITEM,
    payload: {
        sessionId,
        itemId,
    }
})

export const createSession = (userId: string, socketId: string): SocketReduxAction => ({
    type: CREATE_SESSION,
    payload: {
        userId,
        socketId,
    }
})

export const deleteSessionByUser = (userId: string): SocketReduxAction => ({
    type: DELETE_SESSION_BY_USER,
    payload: {
        userId,
    }
})

export const addPack = (sessionId: string, pack: Pack): SocketReduxAction => ({
    type: ADD_PACK,
    payload: {
        sessionId,
        pack
    }
})

export const deletePack = (sessionId: string, packId: string): SocketReduxAction => ({
    type: DELETE_PACK,
    payload: {
        sessionId,
        packId,
    }
})

export const addCharacter = (sessionId: string, character: Character): SocketReduxAction => ({
    type: ADD_CHARACTER,
    payload: {
        sessionId,
        character
    }
})

export const deleteCharacter = (sessionId: string, characterId: string): SocketReduxAction => ({
    type: DELETE_CHARACTER,
    payload: {
        sessionId,
        characterId,
    }
})

export const addItem = (sessionId: string, item: Item): SocketReduxAction => ({
    type: ADD_ITEM,
    payload: {
        sessionId,
        item,
    }
})

export const deleteItem = (sessionId: string, itemId: string): SocketReduxAction => ({
    type: DELETE_ITEM,
    payload: {
        sessionId,
        itemId,
    }
})