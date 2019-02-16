import React, { useEffect, useState, CSSProperties } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BattleCharacter } from './components/BattleCharacter'
import { requestCreateRoom, requestLeaveRoom, requestJoinRoom, requestFindRoom, readyUser, cancelReady } from '../../state/actions/room.actions'
import { TopBar } from '../Core/TopBar'
import Modal from 'react-modal'
import Session from '../Session'
import { RoomSidebar } from './components/RoomSidebar'
import { Party } from '../../types/party'
import { RoomActionbar } from './components/RoomActionBar'
import { RoomTopbar } from './components/RoomTopbar'
import './index.scss'

export const Room = (props: any) => {
    const [ sessionModalOpen, setSessionModalOpen ] = useState(false)
    const { auth, session, history, requestCreateRoom, requestJoinRoom, requestLeaveRoom, requestFindRoom, room, location, readyUser, cancelReady } = props

    const getParty = (userId) => {
        if (room.battle) {
            return room.battle.parties.get(userId)
        }
        return session.party
    }

    useEffect(() => {
        if (!session || !session.sessionId || !auth.loggedIn) return history ? history.push('/') : null
    })

    useEffect(() => {
        if (location.pathname === '/battle/create')
            requestCreateRoom()
        if (location.pathname === '/battle/find')
            requestFindRoom()
        return () => { requestLeaveRoom() }
    }, [])

    const joinRoom = (roomId) => roomId ? requestJoinRoom(roomId) : null
    const isUser = (userId) => room.users.map(u => u.id).contains(userId)
    const isReady = (userId) => room.readyUserIds.contains(userId)
    const isSecret = (userId) => userId !== session.userId
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
    const activeCharacterStyle = {
        padding: 16,
        boxShadow: '1px 0px 5px black inset',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, hsl(0,0%,20%) 0%,hsl(0,0%,10%) 50%, hsl(0,0%,15%) 100%)',
        minHeight: 213,
        display: 'flex',
    }

    const RoomUserbar = () => (
        <TopBar condensed={true} style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
            {room.playerSessions.map((pSession) => {
                const user = room.users.find(u => u.id === pSession.userId)
                return (
                    <span key={pSession.sessionId} className={'Battle__user--name' + ' ' + getUserClass(user)}>
                        {isReady(user.id) ? 'READY' : null} {user.username}
                    </span>
                )
                })}
        </TopBar>
    )

    return (
        room && room.playerSessions ? <div className='Battle'>
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
                    <RoomUserbar />
                    <RoomActionbar
                        show={room.battle !== null}
                        character={getActiveCharacter(session.userId)}  /> 
                    <div style={characterListStyle as CSSProperties}>
                        <div className='Battle__activeUser'style={activeCharacterStyle as CSSProperties}>
                            {room.users.map(u => u.id).map((userId,  index) => (
                                <div key={userId} style={{ width: 'calc(50% - 8px)' }}>
                                    <div className='Battle__user'>
                                        {getActiveCharacter(userId) ? 
                                            <div>
                                                <BattleCharacter 
                                                    reverse={index === 1} 
                                                    active={true} 
                                                    character={getActiveCharacter(userId)} secret={isSecret(userId)} 
                                                />
                                            </div>: 
                                        null
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {room.users.map(u => u.id).map((userId, index) => (
                                <div key={userId} style={{ width: '50%', display: 'flex' }}>
                                    <div className='Battle__user'>
                                        {getParty(userId).characters.shift().map(character => 
                                            <div key={character.__uuid} style={{padding: 8}}>
                                                <BattleCharacter 
                                                    reverse={index === 1} 
                                                    active={false} 
                                                    character={character} secret={isSecret(userId)} 
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <RoomSidebar />
            </div>
            <Modal
                isOpen={sessionModalOpen}
                onRequestClose={() => setSessionModalOpen(false)}
                style={{
                    content: {
                        background: 'white',
                        zIndex: 9999,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.52)'
                    }
                }}  
            >
                <Session isModal={true} viewOnly={isReady(session.userId)} onClose={() => setSessionModalOpen(false)} />
            </Modal>
        </div> : null
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
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Room)