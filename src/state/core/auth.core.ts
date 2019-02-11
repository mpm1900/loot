export const loginSuccess = (state, action) => {
    return {
        ...state,
        loggedIn: true,
    }
}

export const logoutSuccess = (state, action) => {
    return {
        ...state,
        loggedIn: false,
    }
}