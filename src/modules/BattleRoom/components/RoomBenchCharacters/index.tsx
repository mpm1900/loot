import React, { CSSProperties } from 'react'
import { BattleCharacter } from '../BattleCharacter'

export const RoomBenchCharacters = (props) => {
    const { room, getParty, isSecret } = props
    const style = { width: '50%', display: 'flex', flexDirection: 'column' }
    return (
        <div style={{ display: 'flex' }}>
            {room.users.map((user, index) => (
                <div key={user.id} style={style as CSSProperties}>
                    {getParty(user.id).characters.shift().map(character => 
                        <div key={character.__uuid} style={{ padding: 8, flex: 1 }}>
                            <BattleCharacter
                                reverse={index === 1} 
                                active={false} 
                                character={character} 
                                secret={isSecret(user.id)} 
                                secretBars={isSecret(user.id)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}