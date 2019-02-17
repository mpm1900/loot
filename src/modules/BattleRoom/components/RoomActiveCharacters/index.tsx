import React, { CSSProperties } from 'react'
import { BattleCharacter } from '../BattleCharacter'
import './index.scss'

export const RoomActiveCharacters = (props) => {
    const { isSecret, getActiveCharacter, room } = props
    const activeCharacterStyle = {
        padding: 16,
        boxShadow: '1px 0px 5px black inset',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, hsl(0,0%,20%) 0%,hsl(0,0%,10%) 50%, hsl(0,0%,15%) 100%)',
        minHeight: 213,
        display: 'flex',
    }
    return (
        <div className='RoomActiveCharacters'style={activeCharacterStyle as CSSProperties}>
            {room.users.map((user,  index) => (
                <div key={user.id} style={{ width: 'calc(50% - 8px)' }}>
                    <div className='Battle__user'>
                        <BattleCharacter 
                            reverse={index === 1} 
                            active={true} 
                            character={getActiveCharacter(user.id)} 
                            secret={isSecret(user.id) && !room.battle}
                            secretBars={isSecret(user.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}