import { combineReducers } from 'redux'
import roomsReducer from './rooms.state'
import sessionsReducer from './sessions.state'

export default combineReducers({
    rooms: roomsReducer,
    sessions: sessionsReducer,
})