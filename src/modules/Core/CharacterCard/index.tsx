import React from 'react'
import { Character } from '../../../types/character'
import { ElementType } from '../../../types/element'
import { Icon } from '../Icon'
import { TypeChip } from '../TypeChip'
import { EquipItemDropTarget } from '../PackCharacterItemList/components/EquipItemDropTarget'
import './index.scss'

export const typeColors = {
    [ElementType.Dark]: 'rgb(139, 106, 180)',
    [ElementType.Fire]: 'rgb(198, 71, 45)',
    [ElementType.Thunder]: 'rgb(239, 176, 58)',
    [ElementType.Water]: '#3A5894',
    [ElementType.Light]: '#CAB298',
    [ElementType.Dragon]: '#ba4366',
}

const getBodyBackground = (character: Character) => 
    character.elementTypes.size > 1 ? 
        `linear-gradient(135deg, ${character.elementTypes.map(c => typeColors[c]).toJS()})`: 
        typeColors[character.elementTypes.get(0)]
        
const CharacterCardStats = ({ character }) => (
    <div className='CharacterCard__body__stats'>
        <div className='CharacterCard__body__stats__stat'>
            <div className='CharacterCard__body__stats__stat--icon'><Icon icon='heart-beats' fill={'white'} /></div>
            <div className="CharacterCard__body__stats__stat--bar">{character.maxHealth}</div>
        </div>
        <div className='CharacterCard__body__stats__stat'>
            <div className='CharacterCard__body__stats__stat--icon'><Icon icon='shield' fill={'white'} /></div>
            <div className="CharacterCard__body__stats__stat--bar">{character.getArmor()}</div>
        </div>
        <div className='CharacterCard__body__stats__stat'>
            <div className='CharacterCard__body__stats__stat--icon'><Icon icon='biceps' fill={'white'} /></div>
            <div className="CharacterCard__body__stats__stat--bar">{character.strength}</div>
        </div>
        <div className='CharacterCard__body__stats__stat'>
            <div className='CharacterCard__body__stats__stat--icon'><Icon icon='burning-eye' fill={'white'} /></div>
            <div className="CharacterCard__body__stats__stat--bar">{character.special}</div>
        </div>
        <div className='CharacterCard__body__stats__stat'>
            <div className='CharacterCard__body__stats__stat--icon'><Icon icon='barefoot' fill={'white'} /></div>
            <div className="CharacterCard__body__stats__stat--bar">{character.speed}</div>
        </div>
    </div>
)

const CharacterCardSkill = ({ skill }) => (
    <div className='CharacterCard__body__skills__skill'>
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
)

const CharacterCardSidebar = ({ character: { elementTypes } }) => (
    <div className='CharacterCard__sidebar'>
        <div className="CharacterCard__sidebar--chip" style={{ marginBottom: 16 }}>
            <Icon icon="abstract-031" size={24} fill={'white'} />
        </div>
        {elementTypes.map(type => (
            <div key={type} className="CharacterCard__sidebar--chip">
                <TypeChip typeString={type} size={32} fill={'white'} />
            </div>
        ))}
    </div>
)

interface iCharacterCardProps {
    character: Character
}
export const CharacterCard = (props: iCharacterCardProps) => {
    const { character } = props
    const withStaticModifiers = character.withStaticModifiers()
    return (
        <EquipItemDropTarget character={character}>
            <div className='CharacterCard'>
                <div className='CharacterCard__body'>
                    <div className='CharacterCard__body__name'>{withStaticModifiers.name}</div>
                    <div className='CharacterCard__body__contents' style={{background: getBodyBackground(withStaticModifiers)}}>
                        <div className='CharacterCard__body__contents--foil'></div>
                        <div className='CharacterCard__body__contents--shadow'></div>
                        <CharacterCardStats character={withStaticModifiers} />
                        <div className='CharacterCard__body__image' style={{backgroundImage: `url(${withStaticModifiers.image})`}}></div>
                        <div className='CharacterCard__body__skills'>{withStaticModifiers.skills.map(skill => (
                            <CharacterCardSkill key={skill.name} skill={skill} />
                        ))}</div>
                    </div>
                </div>
                <CharacterCardSidebar character={character} />
            </div>
        </EquipItemDropTarget>
    )
}