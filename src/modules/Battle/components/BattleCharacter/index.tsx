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
        let { character, secret } = this.props
        character = character.withStaticModifiers()
        return (
            <div className="BattleCharacter">
                <div style={{display: 'flex'}}>
                    <div className="BattleCharacter__avatar">
                        { secret ? 
                            <div style={{height: 120, width: 120, boxSizing: 'border-box', backgroundColor: '#555'}}>
                                <div style={{height: 118, width: 118, border: '1px solid rgba(255,255,255,0.24)', boxSizing: 'border-box'}}></div>
                            </div>:
                            <CharacterAvatar character={character} activeCharacterId={character.__uuid} />
                        }
                    </div>
                    { secret ? 
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{fontWeight: 900, paddingLeft: 8, color: 'white'}}>???</div>
                        <ZeroGuage value={character.getArmor()} max={character.getArmor()} height={24} fills={[[63,177,162],[70, 130, 180]]}>
                            <div style={{display: 'flex', height: 24, fontSize: 16, lineHeight: '25px', justifyContent: 'center', alignItems: 'center'}}>
                                ???
                            </div>
                        </ZeroGuage>
                        <ZeroGuage value={character.health} max={character.maxHealth}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                ???
                            </div>
                        </ZeroGuage>
                    </div>:
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{fontWeight: 900, paddingLeft: 8, color: 'white'}}>{character.name}</div>
                        <ZeroGuage value={character.getArmor()} max={character.getArmor()} height={24} fills={[[63,177,162],[70, 130, 180]]}>
                            <div style={{display: 'flex', height: 24, justifyContent: 'center', alignItems: 'center'}}>
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
                    </div>}
                </div>
            </div>
        )
    }
}