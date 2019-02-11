import React from 'react'
import './index.scss'
import { CharacterAvatar } from '../../../PartyLoadout/components/CharacterSelectSidebar/components/CharacterAvatar';
import { ZeroGuage } from '../ZeroGuage';
import { RandInt } from '../../../../types/random';
import { Icon } from '../../../../components/Icon';


export class BattleCharacter extends React.Component {
    props: any

    constructor(props: any) {
        super(props)
    }

    render() {
        let { character, secret, active, reverse } = this.props
        character = character.withStaticModifiers()
        return (
            <div className="BattleCharacter">
                <div style={{display: 'flex', flexDirection: reverse ? 'row-reverse' :  'row'}}>
                    <div className="BattleCharacter__avatar" style={{height: active ? 180 : 120, width: active ? 180 : 120 }}>
                        { secret ? 
                            <div style={{height: active ? 180 : 120, width: active ? 180 : 120, boxSizing: 'border-box', backgroundColor: '#555'}}>
                                <div style={{
                                    height: '100%', 
                                    width: '100%', 
                                    border: '1px solid rgba(255,255,255,0.24)', 
                                    boxSizing: 'border-box', 
                                    fontSize: 92,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    color: 'rgba(255,255,255,0.36)',
                                }}>?</div>
                            </div>:
                            <CharacterAvatar character={character} activeCharacterId={character.__uuid} />
                        }
                    </div>
                    { secret ? 
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{fontWeight: 900, padding: reverse ? '0 8px 0 0' : '0 0 0 8px', color: 'white', textAlign: reverse ? 'right' : 'left'}}>???</div>
                        <ZeroGuage className={reverse ? 'reverse' : ''} value={1} max={1} height={24} fills={[[63,177,162],[70, 130, 180]]}>
                            <div style={{display: 'flex', height: 24, fontSize: 16, lineHeight: '25px', justifyContent: 'center', alignItems: 'center'}}>
                                ???
                            </div>
                        </ZeroGuage>
                        <ZeroGuage className={reverse ? 'reverse' : ''} value={character.health} max={character.maxHealth}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                ???
                            </div>
                        </ZeroGuage>
                    </div>:
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{fontWeight: 900, padding: reverse ? '0 8px 0 0' : '0 0 0 8px', color: 'white', textAlign: reverse ? 'right' : 'left'}}>{character.name}</div>
                        <ZeroGuage className={reverse ? 'reverse' : ''} value={character.getArmor()} max={character.getArmor()} height={24} fills={[[63,177,162],[70, 130, 180]]}>
                            <div style={{display: 'flex', height: 24, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon icon='shield' size={16} fill={'white'} />
                                <div style={{marginLeft: 4, fontSize: 16, lineHeight: '25px'}}>{character.getArmor()} / {character.getArmor()}</div>
                            </div>
                        </ZeroGuage>
                        <ZeroGuage className={reverse ? 'reverse' : ''} value={character.health} max={character.maxHealth}>
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