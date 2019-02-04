import React from 'react'
import { Character } from '../../../../types/character'
import { ElementType } from '../../../../types/element'
import './index.scss'
import { Icon } from '../../../../components/Icon'
import { TypeChip } from '../../../../components/TypeChip';
import { EquipItemDropTarget } from '../../../../components/PackCharacterItemList/components/EquipItemDropTarget';

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

const getBodyBackground = (character: Character) => 
    character.elementTypes.size > 1 ? 
        `linear-gradient(135deg, ${character.elementTypes.map(c => typeColors[c]).toJS()})`: 
        typeColors[character.elementTypes.get(0)]

interface iCharacterCardProps {
    character: Character
}
export class CharacterCard extends React.Component {
    props: iCharacterCardProps

    render() {
        let { character } = this.props
        return (
            <EquipItemDropTarget character={character}>
                <div className='CharacterCard'>
                    <div className='CharacterCard__body'>
                        <div className='CharacterCard__body__name'>{character.name}</div>
                        <div className='CharacterCard__body__contents' style={{background: getBodyBackground(character)}}>
                            <div className='CharacterCard__body__contents--foil'></div>
                            <div className='CharacterCard__body__contents--shadow'></div>
                            <div className='CharacterCard__body__stats'>
                                <div className='CharacterCard__body__stats__stat'>
                                    <div className='CharacterCard__body__stats__stat--icon'><Icon icon='heart-beats' fill={'white'} /></div>
                                    <div className="CharacterCard__body__stats__stat--bar">{character.withStaticModifiers().maxHealth}</div>
                                </div>
                                <div className='CharacterCard__body__stats__stat'>
                                    <div className='CharacterCard__body__stats__stat--icon'><Icon icon='shield' fill={'white'} /></div>
                                    <div className="CharacterCard__body__stats__stat--bar">{character.withStaticModifiers().getArmor()}</div>
                                </div>
                                <div className='CharacterCard__body__stats__stat'>
                                    <div className='CharacterCard__body__stats__stat--icon'><Icon icon='biceps' fill={'white'} /></div>
                                    <div className="CharacterCard__body__stats__stat--bar">{character.withStaticModifiers().strength}</div>
                                </div>
                                <div className='CharacterCard__body__stats__stat'>
                                    <div className='CharacterCard__body__stats__stat--icon'><Icon icon='burning-eye' fill={'white'} /></div>
                                    <div className="CharacterCard__body__stats__stat--bar">{character.withStaticModifiers().special}</div>
                                </div>
                                <div className='CharacterCard__body__stats__stat'>
                                    <div className='CharacterCard__body__stats__stat--icon'><Icon icon='barefoot' fill={'white'} /></div>
                                    <div className="CharacterCard__body__stats__stat--bar">{character.withStaticModifiers().speed}</div>
                                </div>
                            </div>
                            <div className='CharacterCard__body__image' style={{backgroundImage: `url(${character.withStaticModifiers().image})`}}></div>
                            <div className='CharacterCard__body__skills'>
                                {character.withStaticModifiers().skills.map(skill => (
                                    <div key={skill.name} className='CharacterCard__body__skills__skill'>
                                        <strong>{skill.name}</strong>
                                        <div className='CharacterCard__body__skills__skill--description'>{skill.text.split(' ').map((word, index) => {
                                            if (word === ElementType.Light) return <TypeChip key={index} typeString={ElementType.Light} size={14} />
                                            if (word === ElementType.Thunder) return <TypeChip key={index} typeString={ElementType.Thunder} size={14} />
                                            if (word === ElementType.Dark) return <TypeChip key={index} typeString={ElementType.Dark} size={14} />
                                            if (word === ElementType.Water) return <TypeChip key={index} typeString={ElementType.Water} size={14} />
                                            if (word === ElementType.Dragon) return <TypeChip key={index} typeString={ElementType.Dragon} size={14} />
                                            if (word === ElementType.Fire) return <TypeChip key={index} typeString={ElementType.Fire} size={14} />
                                            return <div key={index}>{word}</div>
                                        })}</div>
                                        <div className="CharacterCard__body__skills__skill--cooldown">
                                            <Icon icon={`inverted-dice-${skill.cooldown.max}`} size={20} fill={'black'}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='CharacterCard__sidebar'>
                        <div className="CharacterCard__sidebar--chip" style={{ marginBottom: 16 }}>
                            <Icon icon="abstract-031" size={24} fill={'white'} />
                        </div>
                        {character.withStaticModifiers().elementTypes.map(type => (
                            <div key={type} className="CharacterCard__sidebar--chip">
                                <TypeChip typeString={type} size={32} fill={'white'} />
                            </div>
                        ))}
                    </div>
                </div>
            </EquipItemDropTarget>
        )
    }
}