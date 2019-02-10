import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BattleCharacter } from './components/BattleCharacter';
import { requestCreateRoom, requestLeaveRoom, requestJoinRoom } from '../../state/actions/room.actions';
import { TopBar } from '../Core/TopBar';
import { Icon } from '../../components/Icon';
import RoomChat  from './components/RoomChat';
import '../../components/Icon/icons.svg';
import { Button } from '../Core/Button';
import Modal, { Styles } from 'react-modal'
import PartyLoadout from '../PartyLoadout';

enum SidebarKey {
    Users = 'Users',
    Chat = 'Chat',
    Battlelog = 'Battlelog'
}

export const Room = (props: any) => {
    const [ sidebarKey, setSidebarKey ] = useState(SidebarKey.Chat)
    const [ roomId, setRoomId ] = useState(null)
    const [ sessionModalOpen, setSessionModalOpen ] = useState(false)
    const { session, history, requestCreateRoom, requestJoinRoom, requestLeaveRoom, room, users, } = props

    useEffect(() => {
        if (!session || !session.sessionId) return history ? history.push('/') : null
        requestCreateRoom()
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

    return (
        room && room.playerSessions ? <div className='Battle'>
            <TopBar style={{paddingRight: 0}}>
                <div className='roomid'>
                    <strong>{room.id}</strong>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    <input className='Room__search' placeholder={'enter room id'} value={roomId} onChange={event => setRoomId(event.target.value)} />
                    <Button style={{ marginRight: 4 }} onClick={() => joinRoom(roomId)}>Join Room</Button>
                    <Button style={{ marginRight: 4 }} onClick={() => setSessionModalOpen(true)}>Leave Room</Button>
                    <Button style={{ marginRight: 4 }} onClick={() => setSessionModalOpen(true)}>Edit Party</Button>
                    <Button style={{ marginRight: 4 }} onClick={() => setSessionModalOpen(true)}>Start Battle</Button>
                </div>
            </TopBar>
            <div className='Battle__body'>
                <div style={{ display: 'flex', flex: 1, overflowY: 'auto' }}>
                    {room.playerSessions.map(session => <div style={{width: '50%', padding: 8}}>
                        <div className='Battle__user'>
                            <span className='Battle__user--name'>{room.users.find(user => user.id === session.userId).username}</span>
                            {session.party.characters.map(character => <BattleCharacter character={character} />)}
                        </div>
                    </div>)}
                </div>
                <div className='Battle__sidebar'>
                    <TopBar style={{ borderLeft: 'none' }}>
                        <div style={{width: '33%' }} onClick={() => setSidebarKey(SidebarKey.Users)}><Icon size={32} icon='two-shadows' fill='rgba(255,255,255,0.54)' /></div>
                        <div style={{width: '33%' }} onClick={() => setSidebarKey(SidebarKey.Chat)}><Icon size={32} icon='talk' fill='rgba(255,255,255,0.54)' /></div>
                        <div style={{width: '33%' }} onClick={() => setSidebarKey(SidebarKey.Battlelog)}><Icon size={32} icon='audio-cassette' fill='rgba(255,255,255,0.54)' /></div>
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
                    <PartyLoadout isModal={true} onClose={() => setSessionModalOpen(false)} />
                </Modal>
        </div> : null
    )
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestCreateRoom,
    requestLeaveRoom,
    requestJoinRoom,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Room)