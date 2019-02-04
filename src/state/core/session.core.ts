import { ClientSessionState } from '../reducers/session.state'
import { ClientReduxAction } from '../actions';

export const setState = (state: ClientSessionState, action: ClientReduxAction): ClientSessionState => {
    return {
        ...state,
        ...action.payload.state,
    }
}