import socketIO, { Socket, Server as SocketServer } from 'socket.io'
import { Server } from 'http';
import { makeStore } from './state'
import { authorizeConnection } from './socket'
import { createConnection } from './socket'

export default (server: Server) => {
    const io: SocketServer = socketIO(server)
    const store = makeStore()
    io.on('connection', (socket: Socket) => {
        console.log('connection')
        socket.on('connection-auth', async ({ username, password }) => {
            await authorizeConnection({ username, password }, socket, store)
            console.log('connection-auth done')
        })
        socket.on('connection-create', async ({ username, password }) => {
            await createConnection({ username, password }, socket, store)
            console.log('connection-create done')
        })
    })
}