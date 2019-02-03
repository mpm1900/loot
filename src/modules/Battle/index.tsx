import React from 'react'
import './index.scss'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BattleCharacter } from './components/BattleCharacter';
import { requestCreateRoom, requestLeaveRoom, requestJoinRoom } from '../../state/actions/room.actions';
import { TopBar } from '../Core/TopBar';
import { Icon } from '../../components/Icon';
import RoomChat from './components/RoomChat';
import '../../components/Icon/icons.svg';
import { Button } from '../../components/Button';
import Modal, { Styles } from 'react-modal'
import PartyLoadout from '../PartyLoadout';

enum SidebarKey {
    Users = 'Users',
    Chat = 'Chat',
    Battlelog = 'Battlelog'
}

export class Battle extends React.Component {
    props: any
    state: any

    constructor(props) {
        super(props)
        this.state = {
            sidebarKey: SidebarKey.Chat,
        }
    }

    handleRoomInputChange(event) {
        this.setState({ roomId: event.target.value })
    }

    componentDidMount() {
        if (!this.props.session || !this.props.session.sessionId) return this.props.history.push('/')
        this.props.requestCreateRoom()
    }

    componentWillUnmount() {
        this.props.requestLeaveRoom()
    }

    joinRoom() {
        if (this.state.roomId)
            this.props.requestJoinRoom(this.state.roomId)
    }

    getSidebarComponent(key: string, props: any) {
        switch (key) {
            case SidebarKey.Users: return <div>USERS</div>
            case SidebarKey.Chat: return <RoomChat />
            case SidebarKey.Battlelog: return <div>BATTLELOG</div>
            default: return <div></div>
        }
    }

    render() {
        return (
            this.props.room && this.props.room.playerSessions ? <div className='Battle'>
                <TopBar style={{paddingRight: 0}}>
                    <div className='roomid'>
                        <strong>{this.props.room.id}</strong>
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <input className='Room__search' placeholder={'enter room id'} value={this.state.roomId} onChange={event => this.handleRoomInputChange(event)} />
                        <Button style={{padding: '0 16px', marginRight: 4 }} onClick={() => this.joinRoom()}>Join Room</Button>
                        <Button style={{padding: '0 16px', marginRight: 4 }} onClick={() => this.setState({ sessionModalOpen: true })}>Edit Session</Button>
                    </div>
                </TopBar>
                <div className='Battle__body'>
                    <div style={{ display: 'flex', flex: 1, padding: 16, overflowY: 'auto' }}>
                        {this.props.room.playerSessions.map(session => <div style={{width: '50%', padding: 8}}>
                            {session.party.characters.map(character => <BattleCharacter character={character} />)}
                        </div>)}
                    </div>
                    <div className='Battle__sidebar'>
                        <TopBar style={{ justifyContent: 'space-around'}}>
                            <a href='#' onClick={() => this.setState({ sidebarKey: SidebarKey.Users })}><Icon size={32} icon='two-shadows' /></a>
                            <a href='#' onClick={() => this.setState({ sidebarKey: SidebarKey.Chat })}><Icon size={32} icon='talk' /></a>
                            <a href='#' onClick={() => this.setState({ sidebarKey: SidebarKey.Battlelog })}><Icon size={32} icon='audio-cassette' /></a>
                        </TopBar>
                        <div className='Battle__sidebar__body'>
                            {this.getSidebarComponent(this.state.sidebarKey, this.props)}
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.sessionModalOpen}
                    onRequestClose={() => this.setState({ sessionModalOpen: false })}
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
                        <PartyLoadout isModal={true} onClose={() => this.setState({ sessionModalOpen: false })}  />
                    </Modal>
            </div> : null
        )
    }
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestCreateRoom,
    requestLeaveRoom,
    requestJoinRoom,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Battle)