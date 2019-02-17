import { Socket } from 'socket.io'
import { Store } from 'redux';
import { registerSessionSocketEvents } from './session'
import { registerRoomSocketEvents } from './room'

export const registerSocketEvents = async (socket: Socket, store: Store) => {
    await registerSessionSocketEvents(socket, store)
    await registerRoomSocketEvents(socket, store)
}