import React, { useEffect, useState, CSSProperties } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestCreateRoom, requestLeaveRoom, requestJoinRoom, requestFindRoom, readyUser, cancelReady, setSkill } from '../../state/actions/room.actions'
import Modal from '../Core/Modal'
import Session from '../Session'
import { RoomSidebar } from './components/RoomSidebar'
import { Party } from '../../types/party'
import { RoomActionbar } from './components/RoomActionBar'
import { RoomTopbar } from './components/RoomTopbar'
import { RoomUserbar } from './components/RoomUserbar'
import { RoomActiveCharacters } from './components/RoomActiveCharacters'
import { RoomBenchCharacters } from './components/RoomBenchCharacters'
import './index.scss'
import { List } from 'immutable';

export const Room = (props: any) => {
    const [ sessionModalOpen, setSessionModalOpen ] = useState(false)
    const { auth, session, history, requestCreateRoom, requestJoinRoom, requestLeaveRoom, requestFindRoom, room, location, readyUser, cancelReady, setSkill } = props
    if (!(room && room.playerSessions)) return null
    
    useEffect(() => {
        if (!session || !session.sessionId || !auth.loggedIn) return history ? history.push('/') : null
    })

    useEffect(() => {
        if (location.pathname === '/battle/create') requestCreateRoom()
        if (location.pathname === '/battle/find') requestFindRoom()
        return () => { requestLeaveRoom() }
    }, [])

    const getParty = (userId) => room.battle ?
        room.battle.parties.get(userId):
        (room.playerSessions.find(session => session.userId === userId) || {}).party

    const joinRoom = (roomId) => roomId ? requestJoinRoom(roomId) : null
    const isUser = (userId) => room.users.map(u => u.id).contains(userId)
    const isReady = (userId) => room.readyUserIds.contains(userId)
    const isSecret = (userId) => userId !== session.userId
    const hasChosenSkill = (userId) => {
        if (!room || !room.battle || !room.battle.turn.skillIds) return false
        return !(room.battle.turn.skillIds.get(userId) == null)
    }
    const showActionBar = (room.battle !== null && !hasChosenSkill(session.userId))
    const getUserClass = (user) => {
        if (user) {
            if (user.id === room.creatorId) return 'creator'
            if (isUser(user.id)) return 'user'
        }
        return 'spectator'
    }
    const getActiveCharacter = (userId: string) => {
        const party: Party = getParty(userId)
        if (party) {
            if (room.battle) {
                return party.activeCharacter
            }
            return party.characters.get(0)
        }
        return null
    }

    const battleBodyBorderStyle = { 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        overflowY: 'auto', 
        border: '1px solid black',
        boxSizing: 'border-box',
    }
    const characterListStyle = {
        display: 'flex', 
        flexDirection: 'column',
        flex: 1, 
        border: '1px solid rgba(255,255,255,0.12)', 
        justifyContent: 'flex-start', 
        boxSizing: 'border-box', 
        overflowY: 'auto', 
        background: 'linear-gradient(175deg, hsl(0,0%,27%) 0%,hsl(0,0%,22%) 100%)'
    }

    return (
        <div className='Battle'>
            <RoomTopbar
                room={room}
                userId={session.userId}
                history={history}
                joinRoom={joinRoom}
                isReady={isReady}
                isUser={isUser}
                setSessionModalOpen={setSessionModalOpen}
                readyUser={readyUser}
                cancelReady={cancelReady}
            />
            <div className='Battle__body'>
                <div style={battleBodyBorderStyle as CSSProperties}>
                    <RoomUserbar room={room} isReady={isReady} getUserClass={getUserClass} />
                    <RoomActionbar
                        show={showActionBar}
                        character={getActiveCharacter(session.userId)}
                        setSkill={setSkill}
                        characters={getParty(session.userId) ? getParty(session.userId).characters : List()}
                    /> 
                    <div style={characterListStyle as CSSProperties}>
                        <RoomActiveCharacters 
                            isSecret={isSecret}
                            getActiveCharacter={getActiveCharacter}
                            room={room}
                        />
                        <RoomBenchCharacters
                            isSecret={isSecret}
                            getParty={getParty}
                            room={room}
                            getActiveCharacter={getActiveCharacter}
                        />
                    </div>
                </div>
                <RoomSidebar />
            </div>
            <Modal
                isOpen={sessionModalOpen}
                onRequestClose={() => setSessionModalOpen(false)}>
                <Session 
                    isModal={true} 
                    viewOnly={isReady(session.userId)} 
                    onClose={() => setSessionModalOpen(false)}
                />
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestCreateRoom,
    requestLeaveRoom,
    requestJoinRoom,
    requestFindRoom,
    readyUser,
    cancelReady,
    setSkill,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Room)