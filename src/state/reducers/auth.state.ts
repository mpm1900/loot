import { ClientReduxAction } from '../actions'
import * as Actions from '../actions/auth.actions'
import * as Core from '../core/auth.core'

export type iClientAuth = {
    loggedIn: boolean
}
export const defaultClientAuth: iClientAuth = {
    loggedIn: false,
}

export type ClientAuthState = iClientAuth
const INITIAL_STATE: ClientAuthState = defaultClientAuth

export const AuthReducer = (state: ClientAuthState = INITIAL_STATE, action: ClientReduxAction): ClientAuthState => {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS: return Core.loginSuccess(state, action)
        case Actions.LOGOUT_SUCCESS: return Core.logoutSuccess(state, action)
        default: return state
    }
}