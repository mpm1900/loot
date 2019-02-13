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
        flex: 1, 
        border: '1px solid rgba(255,255,255,0.12)', 
        justifyContent: room.playerSessions.size > 1 ? 'space-between' : 'flex-start', 
        boxSizing: 'border-box', 
        overflowY: 'auto', 
        background: 'linear-gradient(175deg, hsl(0,0%,27%) 0%,hsl(0,0%,22%) 100%)'
    }
    const activeCharacterStyle = (index) => ({
        padding: 16,
        boxShadow: index === 0 ? '1px 0px 5px black inset' : '-1px 0px 5px black inset',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.24)',
        boxSizing: 'border-box',
        width: 'calc(100% - 1px)',
        background: index === 0 ?
            'linear-gradient(135deg, hsl(0,0%,20%) 0%,hsl(0,0%,10%) 100%)':
            'linear-gradient(-45deg, hsl(0,0%,20%) 0%,hsl(0,0%,10%) 100%)'
    })

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

    const RoomActionbar = () => (
        <TopBar style={actionBarStyle}>
            <div style={{ display: 'flex' }}>
                <Button type='primary'>Weapon Attack</Button>
                <Button type='important'>Skill 1</Button>
                <Button type='important'>Skill 2</Button>
                <Button type='important'>Skill 3</Button>
            </div>
            <div style={{ display: 'flex' }}>
                <Button type='info'>Switch Heros</Button>
            </div>
        </TopBar>
    )

    const SessionModal = () => {
        const style = {
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
        }
        
        return (
            <Modal isOpen={sessionModalOpen} onRequestClose={() => setSessionModalOpen(false)} style={style} >
                <Session isModal={true} onClose={() => setSessionModalOpen(false)} />
            </Modal>
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
                        {room.playerSessions.map((pSession, index) => (
                            <div style={{ width: '50%' }}>
                                <div className='Battle__user'>
                                    {pSession.party.characters.get(0) ? 
                                        <div style={activeCharacterStyle(index) as CSSProperties}>
                                            <BattleCharacter 
                                                reverse={index === 1} 
                                                active={true} 
                                                character={pSession.party.characters.get(0)} secret={isSecret(pSession.userId)} 
                                            />
                                        </div>: 
                                        null 
                                    }
                                    {pSession.party.characters.shift().map(character => 
                                        <div style={{padding: 8}}>
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