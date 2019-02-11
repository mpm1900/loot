import { ClientReduxAction } from '.'

export const PREFIX = 'AUTH_'
export const LOGIN = PREFIX + 'LOGIN'
export const LOGOUT = PREFIX + 'LOGOUT'
export const SIGNUP = PREFIX + 'SIGNUP'
export const LOGIN_SUCCESS = PREFIX + 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = PREFIX + 'LOGOUT_SUCCESS'

export const login = (username: string, password: string): ClientReduxAction => ({
    type: LOGIN,
    socket: false,
    payload: {
        username,
        password,
    }
})

export const logout = (): ClientReduxAction => ({
    type: LOGOUT,
    socket: false,
    payload: { }
})

export const signup = (username: string, password: string): ClientReduxAction => ({
    type: SIGNUP,
    socket: false,
    payload: {
        username,
        password,
    }
})

export const loginSuccess = (): ClientReduxAction => ({
    type: LOGIN_SUCCESS,
    socket: true,
    payload: { }
})

export const logoutSuccess = (): ClientReduxAction => ({
    type: LOGOUT_SUCCESS,
    socket: true,
    payload: { }
})