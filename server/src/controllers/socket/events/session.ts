import { Socket } from 'socket.io'
import { Store } from 'redux'
import * as Utils from '../util'
import { Character } from '../../../types/character'
import {
    partyUpdateCharacter,
    partyAddCharacter,
    partyUpdateActiveCharacterId,
    partySwapCharacters,
    partyDeleteCharacter,
    partyClearCharacters
} from '../state/actions/sessions.actions'

const Events = {
    SET_STATE: 'initialize-state__session',

    PARTY_UPDATE_ACTIVE_CHARACTER: 'session__party__update-active-character-id',
    PARTY_UPDATE_CHARACTER: 'session__party__update-character',
    PARTY_SWAP_CHARACTERS: 'session__party__swap-characters',
    PARTY_DELETE_CHARACTER: 'session__party__delete-character',
    PARTY_ADD_CHARACTER: 'session__party__add-character',
    PARTY_CLEAR_CHARACTERS: 'session__party__clear-characters',
}

export const blastSession = async (sessionId: string, socket: Socket, store: Store, blastToRooms = true) => {
    const session = Utils.findSessionById(store.getState().sessions, sessionId)
    if (session) {
        const rooms = Utils.findRoomsByUser(store.getState().rooms, session.userId)
        const sessionState = Utils.serializeSession(session);
        socket.emit(Events.SET_STATE, { state: sessionState })
        if (rooms && rooms.size > 0 && blastToRooms) {
            const sessions = store.getState().sessions
            rooms.forEach(async room => {
                if (room) {
                    const state =  Utils.serializeRoom(await Utils.populateRoom(room, sessions))
                    socket.emit('initialize-state__room', { state })
                    socket.to(room.id).emit('initialize-state__room', { state })
                }
            })
        }
    }
}

export const registerSessionSocketEvents = async (socket: Socket, store: Store) => {
    socket.on(Events.PARTY_UPDATE_ACTIVE_CHARACTER, ({ sessionId, characterId }) => {
        store.dispatch(partyUpdateActiveCharacterId(sessionId, characterId))
        blastSession(sessionId, socket, store, false)
    })

    socket.on(Events.PARTY_UPDATE_CHARACTER, ({ sessionId, character }) => {
        store.dispatch(partyUpdateCharacter(sessionId, Character.deserialize(character)))
        blastSession(sessionId, socket, store)
    })

    socket.on(Events.PARTY_SWAP_CHARACTERS, ({ sessionId, aIndex, bIndex }) => {
        store.dispatch(partySwapCharacters(sessionId, aIndex, bIndex))
        blastSession(sessionId, socket, store)
    })

    socket.on(Events.PARTY_DELETE_CHARACTER, ({ sessionId, characterId }) => {
        store.dispatch(partyDeleteCharacter(sessionId, characterId))
        blastSession(sessionId, socket, store)
    })

    socket.on(Events.PARTY_ADD_CHARACTER, ({ sessionId, characterId }) => {
        store.dispatch(partyAddCharacter(sessionId, characterId))
        blastSession(sessionId, socket, store)
    })

    /*
    socket.on('session__party__equip-item', ({ sessionId, characterId, itemId }) => {
        console.log(sessionId, characterId, itemId)
    })
    */

    socket.on(Events.PARTY_CLEAR_CHARACTERS, ({ sessionId }) => {
        store.dispatch(partyClearCharacters(sessionId))
        blastSession(sessionId, socket, store)
    })
}