import React, { useState } from 'react'
import { TopBar } from '../../../Core/TopBar'
import { Input } from '../../../Core/Input'
import { Button } from '../../../Core/Button'
import './index.scss'

export const RoomTopbar = (props) => {
    const { room, userId, history } = props
    const { joinRoom, isReady, isUser, setSessionModalOpen, readyUser, cancelReady } = props
    const [ roomId, setRoomId ] = useState('')
    return (
        <TopBar>
            <div className='roomid'>
                <strong>{room.id}</strong>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                { !room.battle ? [
                    <Input className='RoomTopbar__search' placeholder={'enter room id'} value={roomId} onChange={event => setRoomId(event.target.value)} />,
                    <Button type='secondary' onClick={() => joinRoom(roomId)}>Join Room</Button>
                ]: null }
                <Button type='secondary' onClick={() => history.push('/')}>Leave Room</Button>
                <Button type='secondary' onClick={() => setSessionModalOpen(true)}>{!isReady(userId) ? 'Edit' : 'View'} Party</Button>
                { isUser(userId) && !isReady(userId) && !room.battle ? <Button onClick={() => readyUser()}>Ready Up</Button> : null }
                { isUser(userId) && isReady(userId) && !room.battle ? <Button onClick={() => cancelReady()} type='warning'>Cancel</Button> : null }
            </div>
        </TopBar>
    )
}