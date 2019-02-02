import { List } from 'immutable'
import { SocketSession, sSocketSession } from '../state/reducers/sessions.state';
import { Character } from '../../../types/character';
import { Item } from '../../../types/item';
import { Party } from '../../../types/party';
import { Pack } from '../../../types/pack';
import { SocketRoom, PopulatedSocketRoom } from '../state/reducers/rooms.state';

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

export const populateRoom = (room: SocketRoom, sessions: List<SocketSession>): PopulatedSocketRoom => {
    return {
        id: room.id,
        playerSessions: room.playerSessionIds.map(sid => findSessionById(sessions, sid)),
        userIds: room.userIds,
        spectatorIds: room.spectatorIds,
        messages: room.messages,
    }
}

export const serializeRoom = (room: PopulatedSocketRoom): any => {
    console.log('room users', room.playerSessions.map(ps => ps.userId).toJS())
    return {
        id: room.id,
        playerSessions: room.playerSessions.map(session => serializeSession(session)).toArray(),
        userIds: room.userIds.toArray(),
        spectatorIds: room.spectatorIds.toArray(),
        messages: room.messages.toArray(),
    }
}

export const deserializeRoom = (room: any): PopulatedSocketRoom => {
    return {
        id: room.id,
        playerSessions: List<any>(room.playerSessions.map((session: any) => deserializeSession(session))),
        userIds: List(room.userIds),
        spectatorIds: List(room.spectatorIds),
        messages: List(room.messages)
    }
}