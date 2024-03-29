import { List, Map, fromJS } from 'immutable'
import { SocketSession, sSocketSession } from '../state/reducers/sessions.state'
import { Character } from '../../../types/character'
import { Item } from '../../../types/item'
import { Party } from '../../../types/party'
import { Pack } from '../../../types/pack'
import { SocketRoom, PopulatedSocketRoom } from '../state/reducers/rooms.state'
import { findMany } from '../../../models/user/user.util'
import { BattleState } from '../../../types/battle'

export const findSessionById = (sessions: List<SocketSession>, sessionId: string): SocketSession => {
    return sessions.find(session => session.id === sessionId)
}

export const findSessionByUser = (sessions: List<SocketSession>, userId: string): SocketSession => {
    return sessions.find(session => (
        session.userId === userId
    ))
}

export const findRoomById = (rooms: List<SocketRoom>, roomId: string): SocketRoom => {
    return rooms.find(room => room.id === roomId)
}

// this method might not always work
export const findRoomByUser = (rooms: List<SocketRoom>, userId: string): SocketRoom => {
    return rooms.find(room => {
        return (
            room.userIds.contains(userId) ||
            room.spectatorIds.contains(userId)
        )
    })
}

export const findRoomsByUser = (rooms: List<SocketRoom>, userId: string): List<SocketRoom> => {
    return rooms.filter(room => {
        return (
            room.userIds.contains(userId) ||
            room.spectatorIds.contains(userId)
        )
    })
}

export const findSessionIdByUser = (sessions: List<SocketSession>, userId: string): string => {
    return (findSessionByUser(sessions, userId) || { id: undefined }).id
}

export const serializeSession = (session: SocketSession): sSocketSession => {
    return {
        id: session.id,
        socketId: session.socketId,
        userId: session.userId,
        characters: session.characters.map(character => character.serialize()).toArray(),
        items: session.items.map(item => item.serialize()).toArray(),
        packs: session.packs.map(pack => pack.serialize()).toArray(),
        party: session.party.serialize()
    }
}

export const deserializeSession = (sSession: sSocketSession): SocketSession => {
    return {
        id: sSession.id,
        socketId: sSession.socketId,
        userId: sSession.userId,
        characters: List<Character>(sSession.characters.map(sCharacter => Character.deserialize(sCharacter))),
        items: List<Item>(sSession.items.map(sItem => Item.deserialize(sItem))),
        packs: List<Pack>(sSession.packs.map(sPack => Pack.deserialize(sPack))),
        party: Party.deserialize(sSession.party),
    }
}

export const populateRoom = async (room: SocketRoom, sessions: List<SocketSession>): Promise<PopulatedSocketRoom> => {
    const users = await findMany(room.userIds)
    return {
        id: room.id,
        creatorId: room.creatorId,
        playerSessions: room.playerSessionIds.map(sid => findSessionById(sessions, sid)),
        sessionLimit: room.sessionLimit,
        users,
        readyUserIds: room.readyUserIds,
        spectatorIds: room.spectatorIds,
        messages: room.messages,
        settings: room.settings,
        battle: room.battle,
        userRequests: room.userRequests,
    }
}

export const serializeRoom = (room: PopulatedSocketRoom): any => {
    console.log(room.battle ? room.battle.serialize() : null)
    return {
        id: room.id,
        creatorId: room.creatorId,
        playerSessions: room.playerSessions.map(session => serializeSession(session)).toArray(),
        sessionLimit: room.sessionLimit,
        users: room.users.toArray(),
        readyUserIds: room.readyUserIds.toArray(),
        spectatorIds: room.spectatorIds.toArray(),
        messages: room.messages.toArray(),
        settings: room.settings,
        battle: room.battle ? room.battle.serialize() : null,
        userRequests: room.userRequests.toJS(),
    }
}

export const deserializeRoom = async (room: any): Promise<SocketRoom> => {
    const userIds = room.users.map((u: any) => u.id)
    return {
        id: room.id,
        creatorId: room.creatorId,
        playerSessionIds: List<any>(room.playerSessions.map((session: any) => deserializeSession(session))),
        sessionLimit: room.sessionLimit,
        userIds,
        readyUserIds: List(room.readyUserIds),
        spectatorIds: List(room.spectatorIds),
        messages: List(room.messages),
        settings: room.settings,
        battle: BattleState.deserialize(room.battle),
        userRequests: Map<string, List<any>>(fromJS(room.userRequests)),
    }
}