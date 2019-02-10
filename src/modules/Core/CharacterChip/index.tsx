import React from 'react'
import './index.scss'
import { typeColors } from '../../PartyLoadout/components/CharacterCard'
import { Character } from '../../../types/character'
import { TypeChip } from '../../../components/TypeChip'
import { Icon } from '../../../components/Icon'
import { ElementType } from '../../../types/element';
import { DragSource } from 'react-dnd';
import { func } from 'prop-types';

const CharacterChipStats = ({ character }) => (
    <div className='CharacterChip__body__stats'>
        <div className='CharacterChip__body__stats__stat'>
            <div className='CharacterChip__body__stats__stat--icon'><Icon icon='heart-beats' fill={'white'} /></div>
            <div className='CharacterChip__body__stats__stat--bar'>{character.maxHealth}</div>
        </div>
        <div className='CharacterChip__body__stats__stat'>
            <div className='CharacterChip__body__stats__stat--icon'><Icon icon='shield' fill={'white'} /></div>
            <div className="CharacterChip__body__stats__stat--bar">{character.getArmor()}</div>
        </div>
        <div className='CharacterChip__body__stats__stat'>
            <div className='CharacterChip__body__stats__stat--icon'><Icon icon='biceps' fill={'white'} /></div>
            <div className="CharacterChip__body__stats__stat--bar">{character.strength}</div>
        </div>
        <div className='CharacterChip__body__stats__stat'>
            <div className='CharacterChip__body__stats__stat--icon'><Icon icon='burning-eye' fill={'white'} /></div>
            <div className="CharacterChip__body__stats__stat--bar">{character.special}</div>
        </div>
        <div className='CharacterChip__body__stats__stat'>
            <div className='CharacterChip__body__stats__stat--icon'><Icon icon='barefoot' fill={'white'} /></div>
            <div className="CharacterChip__body__stats__stat--bar">{character.speed}</div>
        </div>
    </div>
)

const CharacterCardSkill = ({ skill }) => (
    <div className='CharacterChip__skills__skill'>
        <strong>{skill.name}</strong>
        <div className='CharacterChip__skills__skill--description'>{skill.text.split(' ').map((word, index) => {
            if (word === ElementType.Light) return <TypeChip key={index} typeString={ElementType.Light} size={14} />
            if (word === ElementType.Thunder) return <TypeChip key={index} typeString={ElementType.Thunder} size={14} />
            if (word === ElementType.Dark) return <TypeChip key={index} typeString={ElementType.Dark} size={14} />
            if (word === ElementType.Water) return <TypeChip key={index} typeString={ElementType.Water} size={14} />
            if (word === ElementType.Dragon) return <TypeChip key={index} typeString={ElementType.Dragon} size={14} />
            if (word === ElementType.Fire) return <TypeChip key={index} typeString={ElementType.Fire} size={14} />
            return <div key={index}>{word}</div>
        })}</div>
        <div className="CharacterChip__skills__skill--cooldown">
            <Icon style={{marginRight: 4}} icon={`duration`} size={16} fill={'black'}/> {skill.cooldown.max}
        </div>
    </div>
)

const characterChipSource = {
    beginDrag(props) {
        return {
            id: props.character.__uuid,
        }
    }
}

export const CharacterChip = (props: any) => {
    let { character, showImage, connectDragSource } = props
    showImage = (showImage === undefined) ? false : showImage
    connectDragSource = connectDragSource || function(cmp) { return cmp }
    const getBodyBackground = (character: Character) => 
    character.elementTypes.size > 1 ? 
        `linear-gradient(135deg, ${character.elementTypes.map(c => typeColors[c]).toJS()})`: 
        typeColors[character.elementTypes.get(0)]

    return connectDragSource(
        <div className='CharacterChipBg' style={{ background: getBodyBackground(character), border: '1px solid rgba(0,0,0,1)', marginBottom: 0 }}>
            <div style={{ border: '1px solid rgba(255,255,255,0.24)', height: 'calc(100% - 2px)' }}>
                <div className='CharacterChip' style={{ backgroundImage: showImage ? `url(${character.avatar})` : ''}}>
                    <div className='CharacterChip__top'>
                        <div className='CharacterChip__body'>
                            <div className='CharacterChip__name'>{character.name}</div>
                            <CharacterChipStats character={character} />
                        </div>
                        <div className='CharacterChip__right'>
                            {character.elementTypes.map(type => (
                                <div key={type} className='CharacterChip__right--chip'>
                                    <TypeChip typeString={type} size={36} fill={'white'} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                    <div className='CharacterChip__bottom'>
                        <div className='CharacterChip__skills'>{character.skills.map(skill => (
                            <CharacterCardSkill key={skill.name} skill={skill} />
                        ))}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DragSource('CharacterChip', characterChipSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(CharacterChip)