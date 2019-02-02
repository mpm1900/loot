import { ClientRoomState } from "../reducers/room.state";
import { ClientReduxAction } from "../actions";

export const setState = (state: ClientRoomState, action: ClientReduxAction): ClientRoomState => {
    return {
        ...state,
        ...action.payload.state
    }
}

export const sendMessage = (state: ClientRoomState, action: ClientReduxAction): ClientRoomState => {
    return {
        ...state,
        messages: state.messages.push(action.payload.message),
    }
}