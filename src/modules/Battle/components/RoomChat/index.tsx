import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { sendMessage } from '../../../../state/actions/room.actions';
import { Icon } from '../../../../components/Icon';
import './index.scss'

const RoomChatMessage = (message: any) => (
    <div className='RoomChat__message'>
        <strong>{message.userId}</strong>
        <span className='RoomChat__message__message'>{message.message.split(' ').map((word: string, index: number) => {
            if (word.charAt(0) === ':' && word.charAt(word.length - 1) === ':') {
                return <div key={index}><Icon icon={word.substr(1, word.length - 2)} fill='white' size={16} /></div>
            }
            return <div key={index}>{word + ' '}</div>
        })}</span>
    </div>
)

const RoomChat = (props: any) => {
    const [ userMessage, setUserMessage ] = useState('')
    const { messages, sendMessage } = props

    const checkEnter = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage(userMessage)
            setUserMessage('')
        }
    }

    return (
        <div className='RoomChat'>
            <div className='RoomChat__body'>
                {messages.map((message, index) => <RoomChatMessage {...message} key={index} />)}
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
    messages: state.room.messages,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendMessage  
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)