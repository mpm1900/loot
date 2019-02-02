import React from 'react'
import { connect } from 'react-redux'
import { TypeChip } from '../TypeChip'
import { Icon } from '../Icon'
import { bindActionCreators } from 'redux'
import { ElementType } from '../../types/element'
import { EquipItemDropTarget } from '../PackCharacterItemList/components/EquipItemDropTarget'
import './index.scss'
import { ZeroGuage } from '../../modules/Battle/components/ZeroGuage';

export const typeColors = {
    [ElementType.Dark]: 'rgb(139, 106, 180)',
    [ElementType.Fire]: 'rgb(198, 71, 45)',
    [ElementType.Thunder]: 'rgb(239, 176, 58)',
    [ElementType.Water]: '#3A5894',
    [ElementType.Grass]: '#4a6741',
    [ElementType.Earth]: '#966532',
    [ElementType.Light]: '#CAB298',
    [ElementType.Ice]: '#87BCE5',
    [ElementType.Dragon]: '#B2375C',
}
// const getCColor = (character) => `rgba(${character.colors.colors[Math.ceil(character.colors.colors.length / 2)]}`;
export class _PackCharacterCard extends React.Component {
    public props: any
    public state: any

    constructor(props) {
        super(props)
        this.state = {
            character: props.character//.withStaticModifiers()
        }
    }

    render() {
        let { style } = this.props
        const character = this.props.character.withStaticModifiers()
        return (
            <EquipItemDropTarget character={character}>
            <div className={`PackCharacter PackCharacter__rarity--${character.rarity}`} style={{...style}}>
                <div style={{display: 'flex', height: '100%'}}>
                    <div className='PackCharacter__body' style={{
                            background: character.elementTypes.size > 1 ? `linear-gradient(135deg, ${character.elementTypes.map(c => typeColors[c]).toJS()})` : typeColors[character.elementTypes.get(0)]
                        }}>
                        <div className='PackCharacter__details'>
                            <div className="PackCharacter__name">{character.name}</div>
                            <div style={{display: 'flex', height: '100%', justifyContent: 'flex-start'}}>
                                <div className='PackCharacter__stats'>
                                    <div className='PackCharacter__stats--icon'><Icon icon='heart-beats' fill={'white'} /></div>
                                    <div className="PackCharacter__stats--bar">{character.maxHealth}</div>
                                </div>
                                <div className='PackCharacter__stats'>
                                    <div className='PackCharacter__stats--icon'><Icon icon='biceps' fill={'white'} /></div>
                                    <div className="PackCharacter__stats--bar">{character.strength}</div>
                                </div>
                                <div className='PackCharacter__stats'>
                                    <div className='PackCharacter__stats--icon'><Icon icon='burning-eye' fill={'white'} /></div>
                                    <div className="PackCharacter__stats--bar">{character.special}</div>
                                </div>
                                <div className='PackCharacter__stats'>
                                    <div className='PackCharacter__stats--icon'><Icon icon='barefoot' fill={'white'} /></div>
                                    <div className="PackCharacter__stats--bar">{character.speed}</div>
                                </div>
                                <div className='PackCharacter__stats'>
                                    <div className='PackCharacter__stats--icon'><Icon icon='shield' fill={'white'} /></div>
                                    <div className="PackCharacter__stats--bar">{character.getArmor()}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="foil" style={{ opacity: 0.25, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}></div>
                            <div style={{position:'relative', zIndex: 2, width: '100%', minHeight: 346, objectFit: 'cover', backgroundImage: `url(${character.image})`, backgroundSize: 'cover', backgroundPositionX: 'center'}} />
                        </div>
                        <div className='PackCharacter__skills'>
                            {character.skills.map(skill => (
                                <div key={skill.__uuid} className='PackCharacter__skills__skill'>
                                    <p><strong>{skill.name}</strong></p>
                                    <div className='desc' style={{display: 'flex', flexWrap: 'wrap'}}>{skill.description(character.special).split(' ').map(word => {
                                        if (word === ElementType.Fire) return <TypeChip typeString={ElementType.Fire} size={16} />
                                        if (word === ElementType.Water) return <TypeChip typeString={ElementType.Water} size={16} />
                                        if (word === ElementType.Light) return <TypeChip typeString={ElementType.Light} size={16} />
                                        if (word === ElementType.Thunder) return <TypeChip typeString={ElementType.Thunder} size={16} />
                                        return <div>{word}</div>
                                    })}</div>
                                    <div className="cooldown"><Icon icon={`inverted-dice-${skill.cooldown.max}`} size={20} fill={'black'}/></div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="stats" style={{flex: 1, display: 'flex', padding: 8}}>
                            <ZeroGuage value={character.health} max={character.maxHealth} />
                        </div>
                    </div>
                    <div className='PackCharacter__type' style={{backgroundColor: '#222'}}>
                        <div className="PackCharacter__type--chip">
                            <Icon icon="abstract-031" size={32} fill={'white'} />
                        </div>
                        {character.elementTypes.map(type => (
                            <div key={type} className="PackCharacter__type--chip">
                                <TypeChip typeString={type} size={32} fill={'white'} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </EquipItemDropTarget>
        )
    }
}


export const PackCharacterCard = (_PackCharacterCard)