import { combineReducers } from "redux";
import { SessionReducer, defaultClientSession } from "./session.state";
import { defaultClientRoom, RoomReducer } from "./room.state";

export const INITIAL_STATE = { 
    session: defaultClientSession,
    room: defaultClientRoom,
}

export default combineReducers({
    session: SessionReducer,
    room: RoomReducer,
})