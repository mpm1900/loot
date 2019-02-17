import { List, Map } from 'immutable'
import { SocketRoomsState, SocketRoom, SocketRoomPublicVisibility } from '../reducers/rooms.state'
import { SocketReduxAction } from '../actions'
import shortid from 'shortid'
import { BattleState } from '../../../../types/battle'
import { Party } from '../../../../types/party'
import { SocketSession } from '../reducers/sessions.state'

export const createRoom = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.push({
        id: shortid.generate(),
        creatorId: action.payload.userId,
        playerSessionIds: List<string>(),
        sessionLimit: 2,
        userIds: List<string>(),
        readyUserIds: List<string>(),
        spectatorIds: List<string>(),
        messages: List<any>(),
        settings: {
            visibility: SocketRoomPublicVisibility.Open,
        },
        battle: null,
    })
}

export const deleteRoom = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.filter(room => room.id !== action.payload.roomId)
}

export const joinRoomAsUser = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state
    return state.update(index, room => ({
        ...room,
        userIds: room.userIds.push(action.payload.userId),
        playerSessionIds: room.playerSessionIds.push(action.payload.sessionId)
    }))
}

export const joinRoomAsSpectator = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state
    return state.update(index, room => ({
        ...room,
        spectatorIds: room.spectatorIds.push(action.payload.userId),
    }))
}

export const leaveAllRooms = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.map(room => ({
        ...room,
        userIds: room.userIds.filter(uid => uid !== action.payload.userId),
        spectatorIds: room.spectatorIds.filter(uid => uid !== action.payload.userId),
    }))
}

export const removeSessionFromRooms = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    return state.map(room => ({
        ...room,
        playerSessionIds: room.playerSessionIds.filter(sid => sid !== action.payload.sessionId)
    }))
}

export const removeEmptyRooms = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const isEmptyRoom = (room: SocketRoom) => {
        return (
            room.userIds.size === 0 &&
            room.spectatorIds.size === 0
        )
    }
    return state.filter(room => !isEmptyRoom(room))
}

export const sendMessage = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state
    return state.update(index, (room: SocketRoom) => {
        return {
            ...room,
            messages: room.messages.push({
                userId: action.payload.userId,
                message: action.payload.message,
            })
        }
    })
}

export const readyUser = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state
    return state.update(index, (room: SocketRoom) => {
        const userId = action.payload.userId
        if (!room.userIds.contains(userId)) return room
        if (room.readyUserIds.contains(userId)) return room
        return {
            ...room,
            readyUserIds: room.readyUserIds.push(userId)
        }
    })
}

export const cancelReady = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state
    return state.update(index, (room: SocketRoom) => {
        const userId = action.payload.userId
        return {
            ...room,
            readyUserIds: room.readyUserIds.filter(id => id !== userId)
        }
    })
}

export const battleInitializeState = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state

    const setActiveAsFirst = (party: Party): Party => {
        if (party.characters.isEmpty()) return party;
        return party.with({
            activeCharacterId: party.characters.get(0).__uuid
        })
    }

    return state.update(index, (room: SocketRoom) => {
        const { sessions } = action.payload
        let parties = Map<string, Party>()
        room.readyUserIds.forEach(userId => {
            const session = sessions.find((s: SocketSession) => s.userId === userId)
            if (session) {
                parties = parties.set(userId, setActiveAsFirst(session.party))
            }
        })
        return {
            ...room,
            battle: new BattleState({ parties }),
        }
    })
}

export const battleSetSkill = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state

    return state.update(index, (room: SocketRoom) => {
        const { battle } = room
        const { userId, skillId, characterId } = action.payload
        return {
            ...room,
            battle: battle.with({
                turn: battle.turn.addSkill(userId, room.battle.parties, skillId, characterId),
            }),
        }
    })
}

export const battleExecuteMain = (state: SocketRoomsState, action: SocketReduxAction): SocketRoomsState => {
    const { roomId } = action.payload
    const index = state.map(room => room.id).indexOf(roomId)
    if (index === -1) return state

    return state.update(index, (room: SocketRoom) => {
        return {
            ...room,
            battle: room.battle.exec()
        }
    })
}