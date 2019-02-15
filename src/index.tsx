import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from "react-dnd"
import { makeStore } from './state/store';
import { Provider } from 'react-redux'
import { Character } from './types/character';
import { Item } from './types/item';
import io from 'socket.io-client'
import { List } from 'immutable';
import { Party } from './types/party';
import { Pack } from './types/pack';
import { setState as setSessionState } from './state/actions/session.actions';
import { setState as setRoomState } from './state/actions/room.actions';
import { ClientRoomState } from './state/reducers/room.state';
import { loginSuccess, logoutSuccess } from './state/actions/auth.actions';
import './index.css';
import './components/Icon/icons.svg'

const socket = io('http://localhost:3005')
const store = makeStore(socket)

export const deserializeSession = (sSession: any): any => {
    return {
        id: sSession.id,
        sessionId: sSession.id,
        socketId: sSession.socketId,
        userId: sSession.userId,
        characters: List<Character>(sSession.characters.map(sCharacter => Character.deserialize(sCharacter))),
        items: List<Item>(sSession.items.map(sItem => Item.deserialize(sItem))),
        packs: List<Pack>(sSession.packs.map(sPack => Pack.deserialize(sPack))),
        party: Party.deserialize(sSession.party),
    }
}

export const deserializeRoom = (room: any): ClientRoomState => {
    return {
        id: room.id,
        creatorId: room.creatorId,
        playerSessions: List<any>(room.playerSessions.map((session: any) => deserializeSession(session))),
        users: List(room.users),
        readyUserIds: List(room.readyUserIds),
        spectators: List(room.spectatorIds),
        messages: List(room.messages),
        connected: room.connected,
    }
}

socket.on('connect', (data) => {
    console.log('connection!')
})
socket.on('disconnect', () => {
    store.dispatch(logoutSuccess())
})
socket.on('request-error', (error) => {
    alert(JSON.stringify(error))
})
socket.on('initialize-state__session', ({ state }) => {
    console.log('set session state!')
    state.sessionId = state.id
    if (!state.party.activeCharacterId && state.party.characters[0]) state.party.activeCharacterId = state.party.characters[0].__uuid
    const session = deserializeSession(state)
    const action = setSessionState(session)
    action.socket = true
    store.dispatch(action)
    store.dispatch(loginSuccess())
})
socket.on('initialize-state__room', ({ state }) => {
    console.log('set room state!', state)
    const room = deserializeRoom(state)
    const action = setRoomState(room)
    action.socket = true
    action.payload.state = {
        ...action.payload.state,
        connected: true,
    }
    store.dispatch(action)
})

ReactDOM.render(
    <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}
            ><App />
        </DragDropContextProvider>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
const thing = '5c4bf6d181ab9b4cd45ecfac';