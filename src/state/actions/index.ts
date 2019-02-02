export interface ClientReduxAction {
    type: string,
    payload?: any,
    socket: boolean,
}