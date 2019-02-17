import * as SessionActions from '../../actions/session.actions'

export const handleSessionAction = (state, action, socket) => {
    const sessionId = state.session.sessionId
    switch (action.type) {
        case SessionActions.PARTY_UPDATE_ACTIVE_CHARACTER_ID: {
            socket.emit('session__party__update-active-character-id', {
                sessionId,
                characterId: action.payload.characterId
            })
            break
        }
        case SessionActions.PARTY_SWAP_CHARACTERS: {
            socket.emit('session__party__swap-characters', {
                sessionId,
                aIndex: action.payload.aIndex,
                bIndex: action.payload.bIndex,
            })
            break
        }
        case SessionActions.PARTY_UPDATE_CHARACTER: {
            socket.emit('session__party__update-character', {
                sessionId,
                character: action.payload.character.serialize()
            })
            break
        }
        case SessionActions.PARTY_DELETE_CHARACTER: {
            socket.emit('session__party__delete-character', {
                sessionId,
                characterId: action.payload.characterId,
            })
            break
        }
        case SessionActions.PARTY_ADD_CHARACTER: {
            socket.emit('session__party__add-character', {
                sessionId,
                characterId: action.payload.characterId,
            })
            break
        }
        case SessionActions.PARTY_CLEAR_CHARACTERS: {
            socket.emit('session__party__clear-characters', {
                sessionId,
            })
        }
    }
}