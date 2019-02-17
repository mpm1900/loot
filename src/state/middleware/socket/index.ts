import { handleSessionAction } from './session'
import { handleRoomAction } from './room'
import { handleAuthAction } from './auth'

export default (socket) => {
    return ({ getState, dispatch }) => next => action => {
        console.log('SOCKET', action)
        const state: any = getState()
        handleAuthAction(state, action, socket)
        handleSessionAction(state, action, socket)
        handleRoomAction(state, action, socket)
        if (action.socket) {
            return next(action)
        }
    }
}