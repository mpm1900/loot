import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import './index.scss'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BattleCharacter } from './components/BattleCharacter';
import { requestCreateRoom, requestLeaveRoom, requestJoinRoom, requestFindRoom } from '../../state/actions/room.actions';
import { TopBar } from '../Core/TopBar';
import { Icon } from '../Core/Icon';
import RoomChat  from './components/RoomChat';
import '../../components/Icon/icons.svg';
import { Button } from '../Core/Button';
import Modal, { Styles } from 'react-modal'
import Session from '../Session';
import { Input } from '../Core/Input';

enum SidebarKey {
    Users = 'Users',
    Chat = 'Chat',
    Battlelog = 'Battlelog',
    Settings = 'Settings',
}

const keyIcons = {
    [SidebarKey.Users]: 'two-shadows',
    [SidebarKey.Chat]: 'talk',
    [SidebarKey.Battlelog]: 'audio-cassette',
    [SidebarKey.Settings]: 'cog',
}

export const Room = (props: any) => {
    const [ sidebarKey, setSidebarKey ] = useState(SidebarKey.Chat)
    const [ roomId, setRoomId ] = useState(null)
    const [ sessionModalOpen, setSessionModalOpen ] = useState(false)
    const { auth, session, history, requestCreateRoom, requestJoinRoom, requestLeaveRoom, requestFindRoom, room, users, location } = props

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

    const sidebar = (key: string, props: any) => {
        switch (key) {
            case SidebarKey.Users: return <div>USERS</div>
            case SidebarKey.Chat: return <RoomChat />
            case SidebarKey.Battlelog: return <div>BATTLELOG</div>
            default: return <div></div>
        }
    }

    const joinRoom = (roomId) => roomId ? requestJoinRoom(roomId) : null
    const isActive = (key) => key === sidebarKey
    const getUserClass = (user) => {
        if (user) {
            if (user.id === room.creatorId) return 'creator'
            if (room.users.map(u => u.id).contains(user.id)) return 'user'
        }
        return 'spectator'
    }

    const battleBodyBorderStyle = { 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        overflowY: 'auto', 
        border: '1px solid black' 
    }
    const actionBarStyle = { 
        backgroundColor: 'hsl(0,0%,20%)', 
        borderLeft: 'none', 
        borderRight: 'none', 
        borderBottom: '1px solid black', 
        justifyContent: 'flex-start' 
    }

    return (
        room && room.playerSessions ? <div className='Battle'>
            <TopBar style={{paddingRight: 0}}>
                <div className='roomid'>
                    <strong>{room.id}</strong>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    <Input className='Room__search' placeholder={'enter room id'} value={roomId} onChange={event => setRoomId(event.target.value)} />
                    <Button type='info' onClick={() => joinRoom(roomId)}>Join Room</Button>
                    <Button type='info' onClick={() => history.push('/')}>Leave Room</Button>
                    <Button type='secondary' onClick={() => setSessionModalOpen(true)}>Edit Party</Button>
                    <Button onClick={() => setSessionModalOpen(true)}>Ready Up</Button>
                </div>
            </TopBar>
            <div className='Battle__body'>
                <div style={battleBodyBorderStyle as CSSProperties}>
                    <TopBar condensed={true} style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                        {room.playerSessions.map((pSession, index) => {
                            const user = room.users.find(u => u.id === pSession.userId)
                            return (
                                <span key={pSession.sessionId} className={'Battle__user--name' + ' ' + getUserClass(user)}>
                                    {user.username}
                                </span>
                            )
                         })}
                    </TopBar>
                    <TopBar style={actionBarStyle}>
                        <div style={{ display: 'flex' }}>
                            <Button type='important'>Weapon Attack</Button>
                            <Button type='important'>Skill 1</Button>
                            <Button type='important'>Skill 2</Button>
                            <Button type='important'>Skill 3</Button>
                            <Button type='important'>Switch</Button>
                        </div>
                    </TopBar>
                    <div style={{ display: 'flex', flex: 1, border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box' }}>
                        {room.playerSessions.map((pSession, index) => <div style={{width: '50%', padding: 8}}>
                            <div className='Battle__user'>
                                {pSession.party.characters.map(character => 
                                    <BattleCharacter reverse={index === 1} 
                                        active={character.__uuid === (pSession.party.characters.get(0) || {}).__uuid} 
                                        character={character} secret={pSession.userId !== session.userId} 
                                    />
                                )}
                            </div>
                        </div>)}
                    </div>
                </div>
                <div className='Battle__sidebar'>
                    <TopBar style={{ borderLeft: 'none', borderRight: 'none' }}>
                        {[SidebarKey.Chat, SidebarKey.Battlelog, SidebarKey.Users, SidebarKey.Settings].map(key => (
                            <div style={{
                                    width: '25%', 
                                    display: 'flex', 
                                    justifyContent: 'center'
                                }} 
                                onClick={() => setSidebarKey(key)}>
                                    <Icon size={32} icon={keyIcons[key]} fill={isActive(key) ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.54)'} />
                            </div>
                        ))}
                    </TopBar>
                    <div className='Battle__sidebar__body'>
                        {sidebar(sidebarKey, props)}
                    </div>
                </div>
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
                    <Session isModal={true} onClose={() => setSessionModalOpen(false)} />
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
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Room)