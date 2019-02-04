import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { bindActionCreators } from 'redux';
import { sendMessage } from '../../../../state/actions/room.actions';
import { Icon } from '../../../../components/Icon';

export class RoomChat extends React.Component {
    props: any
    state: any

    constructor(props: any) {
        super(props)
        this.state = {
            message: '',
        }
    }

    updateCurrentMessage(event) {
        this.setState({
            message: event.target.value
        })
    }

    checkEnter(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            this.sendMessage()
        }
    }    

    sendMessage() {
        this.props.sendMessage(this.state.message)
        setTimeout(() => {
            this.setState({ message: '' })
        }, 200);
    }

    


    render() {
        return (
            <div className='RoomChat'>
                <div className='RoomChat__body'>
                    {this.props.messages.map((message, index) => <div key={index} className='RoomChat__message'>
                        <strong>{message.userId}</strong>
                        <span className='RoomChat__message__message'>{message.message.split(' ').map((word: string, index: number) => {
                            if (word.charAt(0) === ':' && word.charAt(word.length - 1) === ':') {
                                return <div key={index}><Icon icon={word.substr(1, word.length - 2)} fill='white' size={16} /></div>
                            }
                            return <div key={index}>{word + ' '}</div>
                        })}</span>
                    </div>)}
                </div>
                <div className='RoomChat__input'>
                    <textarea 
                        value={this.state.message}
                        placeholder='// Say Something'
                        onChange={(event) => this.updateCurrentMessage(event)}
                        onKeyDown={(event) => this.checkEnter(event)}>
                    </textarea>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    messages: state.room.messages,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendMessage  
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)