import { createStore, applyMiddleware } from 'redux'
import socketMiddleware from '../middleware/socket.middleware'
import reducer from '../reducers'

export const makeStore = (socket) => createStore(
    reducer,
    applyMiddleware(socketMiddleware(socket))
)