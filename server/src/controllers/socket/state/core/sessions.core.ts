import { SocketSessionsState, defaultSocketSession } from '../reducers/sessions.state'
import { v4 } from 'uuid'
import { SocketReduxAction } from '../actions';

export const createSession = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    return state.push({
        ...defaultSocketSession,
        id: v4(),
        userId: action.payload.userId,
        socketId: action.payload.socketId,
    })
}

export const deleteSessionByUser = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    return state.filter(session => (session.userId !== action.payload.userId))
}

export const addPack = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        packs: session.packs.push(action.payload.pack)
    }))
}

export const deletePack = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        packs: session.packs.filter(pack => pack.__uuid !== action.payload.packId),
    }))
}

export const addCharacter = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        characters: session.characters.push(action.payload.character)
    }))
}

export const deleteCharacter = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        characters: session.characters.filter(character => character.__uuid !== action.payload.characterId),
    }))
}

export const addItem = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        items: session.items.push(action.payload.item)
    }))
}

export const deleteItem = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        items: session.items.filter(item => item.__uuid !== action.payload.itemId),
    }))
}

export const partyAddCharacter = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        party: session.party.addCharacter(action.payload.character)
    }))
}
export const partyDeleteCharacter = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        party: session.party.removeCharacter(action.payload.characterId)
    }))
}
export const partyUpdateCharacter = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        party: session.party.with({
            characters: session.party.characters.map(character =>
                character.__uuid === action.payload.character.__uuid ?
                    action.payload.character :
                    character
            )
        })
    }))
}
export const partyUpdateActiveCharacterId = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        party: session.party.with({
            activeCharacterId: action.payload.characterId,
        })
    }))
}
export const partyAddItem = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        party: session.party.addItem(action.payload.item)
    }))
}
export const partyDeleteItem = (state: SocketSessionsState, action: SocketReduxAction): SocketSessionsState => {
    const index = state.map(session => session.id).indexOf(action.payload.sessionId)
    return state.update(index, session => ({
        ...session,
        party: session.party.removeItem(action.payload.itemId)
    }))
}