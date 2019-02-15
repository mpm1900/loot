import React, { useEffect, useState, CSSProperties } from 'react'
import './index.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BattleCharacter } from './components/BattleCharacter'
import { requestCreateRoom, requestLeaveRoom, requestJoinRoom, requestFindRoom, readyUser, cancelReady } from '../../state/actions/room.actions'
import { TopBar } from '../Core/TopBar'
import '../../components/Icon/icons.svg'
import { Button } from '../Core/Button'
import Modal from 'react-modal'
import Session from '../Session'
import { Input } from '../Core/Input'
import { RoomSidebar } from './components/RoomSidebar'

export const Room = (props: any) => {
    const [ roomId, setRoomId ] = useState(null)
    const [ sessionModalOpen, setSessionModalOpen ] = useState(false)
    const { auth, session, history, requestCreateRoom, requestJoinRoom, requestLeaveRoom, requestFindRoom, room, users, location, readyUser, cancelReady } = props

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
    const getSessionIndex = (userId: string) => room.playerSessions.map(session => session.userId === userId).indexOf(userId)
    const getActiveCharacter = (userId: string) => {
        const session = room.playerSessions.get(getSessionIndex(userId))
        if (session) {
            return session.party.characters.get(0)
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
    const actionBarStyle = { 
        background: 'linear-gradient(175deg, hsl(0,0%,25%) 0%,hsl(0,0%,20%) 100%)', 
        borderLeft: 'none', 
        borderRight: 'none', 
        borderBottom: '1px solid black', 
        justifyContent: 'flex-start' 
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

    const RoomTopbar = () => (
        <TopBar>
            <div className='roomid'>
                <strong>{room.id}</strong>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <Input className='Room__search' placeholder={'enter room id'} value={roomId} onChange={event => setRoomId(event.target.value)} />
                <Button type='secondary' onClick={() => joinRoom(roomId)}>Join Room</Button>
                <Button type='secondary' onClick={() => history.push('/')}>Leave Room</Button>
                <Button type='secondary' onClick={() => setSessionModalOpen(true)}>{!isReady(session.userId) ? 'Edit' : 'View'} Party</Button>
                { isUser(session.userId) && !isReady(session.userId) ? <Button onClick={() => readyUser()}>Ready Up</Button> : null }
                { isUser(session.userId) && isReady(session.userId) ? <Button onClick={() => cancelReady()} type='warning'>Cancel</Button> : null }
            </div>
        </TopBar>
    )

    const RoomUserbar = () => (
        <TopBar condensed={true} style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
            {room.playerSessions.map((pSession, index) => {
                const user = room.users.find(u => u.id === pSession.userId)
                return (
                    <span key={pSession.sessionId} className={'Battle__user--name' + ' ' + getUserClass(user)}>
                        {isReady(user.id) ? 'READY' : null} {user.username}
                    </span>
                )
                })}
        </TopBar>
    )

    const RoomActionbar = () => {
        const character = getActiveCharacter(session.userId)
        return (
            <TopBar style={actionBarStyle}>
                { character !== null ? 
                    <div style={{ display: 'flex' }}>
                        <Button type='primary'>Weapon Attack</Button>
                        {character.skills.map(skill => (
                            <Button key={skill.__uuid} type='important'>{skill.name}</Button>  
                        ))}
                    </div>: 
                    null 
                }
                <div style={{ display: 'flex' }}>
                    <Button type='info'>Switch Heros</Button>
                </div>
            </TopBar>
        )
    }

    return (
        room && room.playerSessions ? <div className='Battle'>
            <RoomTopbar />
            <div className='Battle__body'>
                <div style={battleBodyBorderStyle as CSSProperties}>
                    <RoomUserbar />
                    <RoomActionbar /> 
                    <div style={characterListStyle as CSSProperties}>
                        <div className='Battle__activeUser'style={activeCharacterStyle as CSSProperties}>
                            {room.playerSessions.map((pSession, index) => (
                                <div key={pSession.sessionId} style={{ width: 'calc(50% - 8px)' }}>
                                    <div className='Battle__user'>
                                        {pSession.party.characters.get(0) ? 
                                            <div>
                                                <BattleCharacter 
                                                    reverse={index === 1} 
                                                    active={true} 
                                                    character={pSession.party.characters.get(0)} secret={isSecret(pSession.userId)} 
                                                />
                                            </div>: 
                                        null
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {room.playerSessions.map((pSession, index) => (
                                <div key={pSession.sessionId} style={{ width: '50%', display: 'flex' }}>
                                    <div className='Battle__user'>
                                        {pSession.party.characters.shift().map(character => 
                                            <div key={character.__uuid} style={{padding: 8}}>
                                                <BattleCharacter 
                                                    reverse={index === 1} 
                                                    active={false} 
                                                    character={character} secret={isSecret(pSession.userId)} 
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