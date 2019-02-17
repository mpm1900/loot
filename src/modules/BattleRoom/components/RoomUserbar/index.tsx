import React from 'react'
import { TopBar } from '../../../Core/TopBar'
import './index.scss'

export const RoomUserbar = (props) => {
    const { room, isReady, getUserClass } = props
    const style = {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
    }
    return (
        <TopBar condensed={true} style={style}>
            {room.users.map((user) => {
                return (
                    <span key={user.id} className={'RoomUserbar__name' + ' ' + getUserClass(user)}>
                        {isReady(user.id) ? 'READY' : null} {user.username}
                    </span>
                )
                })}
        </TopBar>
    )
}