import * as AuthActions from '../../actions/auth.actions'

export const handleAuthAction = (state, action, socket) => {
    switch (action.type) {
        case AuthActions.LOGIN: {
            const username = action.payload.username
            const password = action.payload.password
            socket.emit('connection-auth', { username, password })
            break;
        }
        case AuthActions.SIGNUP: {
            const username = action.payload.username
            const password = action.payload.password
            socket.emit('connection-create', { username, password })
            break;
        }
    }
}