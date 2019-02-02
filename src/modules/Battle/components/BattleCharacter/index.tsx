import React from 'react'
import './index.scss'
import CharacterAvatar from '../../../PartyLoadout/components/CharacterSelectSidebar/components/CharacterAvatar';
import { ZeroGuage } from '../ZeroGuage';
import { RandInt } from '../../../../types/random';
import { Icon } from '../../../../components/Icon';


export class BattleCharacter extends React.Component {
    props: any

    constructor(props: any) {
        super(props)
    }

    render() {
        let { character } = this.props
        character = character.withStaticModifiers()
        return (
            <div className="BattleCharacter">
                <div style={{display: 'flex'}}>
                    <div className="BattleCharacter__avatar">
                        <CharacterAvatar character={character} activeCharacterId={character.__uuid} />
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{fontWeight: 900, paddingLeft: 8}}>{character.name}</div>
                        <ZeroGuage value={character.getArmor()} max={character.getArmor()} height={24} fills={[[63,177,162],[70, 130, 180]]}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Icon icon='shield' size={16} fill={'white'} />
                                <div style={{marginLeft: 4, fontSize: 16, lineHeight: '25px'}}>{character.getArmor()} / {character.getArmor()}</div>
                            </div>
                        </ZeroGuage>
                        <ZeroGuage value={character.health} max={character.maxHealth}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Icon icon='heart-beats' size={20} fill={'white'} />
                                <div style={{marginLeft: 4}}>{character.health} / {character.maxHealth}</div>
                            </div>
                        </ZeroGuage>
                    </div>
                </div>
            </div>
        )
    }
}