import { ClientSessionState } from '../reducers/session.state'
import { ClientReduxAction } from '../actions';

export const setState = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        ...action.payload.state,
    }
}

export const addPack = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        packs: state.packs.push(action.payload.pack)
    }
}

export const deletePack = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        packs: state.packs.filter(pack => pack.__uuid !== action.payload.packId),
    }
}

export const addCharacter = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        characters: state.characters.push(action.payload.character)
    }
}

export const deleteCharacter = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        characters: state.characters.filter(character => character.__uuid !== action.payload.characterId),
    }
}

export const addItem = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        items: state.items.push(action.payload.item)
    }
}

export const deleteItem = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        items: state.items.filter(item => item.__uuid !== action.payload.itemId),
    }
}

export const partyAddCharacter = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        party: state.party.addCharacter(action.payload.character)
    }
}
export const partyDeleteCharacter = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        party: state.party.removeCharacter(action.payload.characterId)
    }
}
export const partyUpdateCharacter = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        party: state.party.with({
            characters: state.party.characters.map(character =>
                character.__uuid === action.payload.character.__uuid ?
                    action.payload.character :
                    character
            )
        })
    }
}
export const partyUpdateActiveCharacterId = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        party: state.party.with({
            activeCharacterId: action.payload.characterId,
        })
    }
}
export const partyAddItem = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        party: state.party.addItem(action.payload.item)
    }
}
export const partyDeleteItem = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        party: state.party.removeItem(action.payload.itemId)
    }
}