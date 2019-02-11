import { combineReducers } from "redux";
import { SessionReducer, defaultClientSession } from "./session.state"
import { AuthReducer, defaultClientAuth } from './auth.state'
import { defaultClientRoom, RoomReducer } from "./room.state"

export const INITIAL_STATE = { 
    session: defaultClientSession,
    room: defaultClientRoom,
    auth: defaultClientAuth,
}

export default combineReducers({
    session: SessionReducer,
    room: RoomReducer,
    auth: AuthReducer,
})