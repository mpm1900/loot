import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { sendMessage } from '../../../../state/actions/room.actions';
import { Icon } from '../../../Core/Icon';
import './index.scss'
import { List } from 'immutable';

const RoomChatMessage = (message: any, users: List<any>, room) => {
    console.log('USERS', users)
    const user = users.find(u => u.id === message.userId)
    const getUserClass = (user) => {
        if (user) {
            if (user.id === room.creatorId) return 'creator'
            if (room.users.map(u => u.id).contains(user.id)) return 'user'
        }
        return 'spectator'
    }
    return (
        <div className='RoomChat__message'>
            <strong className={getUserClass(user)}>{user ? user.username : 'Disconnected User'}</strong>
            <span className='RoomChat__message__message'>{message.message.split(' ').map((word: string, index: number) => {
                if (word.charAt(0) === ':' && word.charAt(word.length - 1) === ':') {
                    return <div key={index}><Icon icon={word.substr(1, word.length - 2)} fill='white' size={16} /></div>
                }
                return <div key={index}>{word + ' '}</div>
            })}</span>
        </div>
    )
}

const RoomChat = (props: any) => {
    const [ userMessage, setUserMessage ] = useState('')
    const { messages, sendMessage, users, room } = props

    const checkEnter = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage(userMessage)
            setUserMessage('')
        }
    }

    return (
        <div className='RoomChat'>
            <div className='RoomChat__body'>
                {messages.map((message, index) => RoomChatMessage(message, users, room))}
            </div>
            <div className='RoomChat__input'>
                <textarea 
                    value={userMessage}
                    placeholder='// Say Something'
                    onChange={(event) => setUserMessage(event.target.value)}
                    onKeyUp={(event) => checkEnter(event)}>
                </textarea>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    room: state.room,
    messages: state.room.messages,
    users: state.room.users,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendMessage  
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)