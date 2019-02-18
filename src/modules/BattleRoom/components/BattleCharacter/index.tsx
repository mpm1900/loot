import React from 'react'
import { CharacterAvatar } from '../../../Session/components/CharacterSelect/components/CharacterAvatar'
import { ZeroGuage } from '../ZeroGuage'
import { Icon } from '../../../Core/Icon'
import './index.scss'

const HiddenCharacterDetails = (props) => {
    const { reverse } = props
    const padding = reverse ? '0 8px 0 0' : '0 0 0 8px'
    const textAlign = reverse ? 'right' : 'left'
    const fills = [[63,177,162],[70, 130, 180]]
    return (
        <div className='BattleCharacter__main'>
            <div className='BattleCharacter__main__name' style={{ padding, textAlign }}>???</div>
            <ZeroGuage className={reverse ? 'reverse' : ''} value={1} max={1} height={24} fills={fills}>
                <div className='BattleCharacter__main__armor'>???</div>
            </ZeroGuage>
            <ZeroGuage className={reverse ? 'reverse' : ''} value={1} max={1}>
                <div className='BattleCharacter__main__health'>???</div>
            </ZeroGuage>
        </div>
    )
}

const CharacterDetails = (props) => {
    const { reverse, secretBars } = props
    const character = props.character.withStaticModifiers()
    const padding = reverse ? '0 8px 0 0' : '0 0 0 8px'
    const textAlign = reverse ? 'right' : 'left'
    const fills = [[63,177,162],[70, 130, 180]]
    return (
        <div className='BattleCharacter__main'>
            <div className='BattleCharacter__main__name' style={{ padding, textAlign }}>{character.name}</div>
            <ZeroGuage className={reverse ? 'reverse' : ''} value={character.getArmor()} max={character.getArmor()} height={24} fills={fills} reverse={reverse}>
                {!secretBars ? <div className='BattleCharacter__main__armor'>
                    <Icon icon='shield' size={16} fill={'white'} />
                    <div style={{ marginLeft: 4 }}>{character.getArmor()} / {character.getArmor()}</div>
                </div>: null}
            </ZeroGuage>
            <ZeroGuage className={reverse ? 'reverse' : ''} value={character.health} max={character.maxHealth} reverse={reverse}>
                {!secretBars ? <div className='BattleCharacter__main__health'>
                    <Icon icon='heart-beats' size={20} fill={'white'} />
                    <div style={{ marginLeft: 4 }}>{character.health > 0 ? character.health : 0} / {character.maxHealth}</div>
                </div> : null }
            </ZeroGuage>
        </div>
    )
}

export const BattleCharacter = (props: any) => {
    const { character, secret, secretBars, active, reverse } = props
    if (!character) return null
    const height = active ? 180 : 120
    const width = height
    const flexDirection = reverse ? 'row-reverse' :  'row'

    return (
        <div className="BattleCharacter">
            <div style={{ display: 'flex', flexDirection }}>
                <div className="BattleCharacter__avatar" style={{ height, width }}>
                    { secret ? 
                        <div className='BattleCharacter__avatar--secret' style={{ height, width }}>
                            <div>?</div>
                        </div>:
                        <CharacterAvatar character={character} activeCharacterId={character.__uuid} reverse={reverse} />
                    }
                </div>
                { secret ? 
                    <HiddenCharacterDetails reverse={reverse} />:
                    <CharacterDetails reverse={reverse} character={character} secretBars={secretBars} />
                }
            </div>
        </div>
    )
}