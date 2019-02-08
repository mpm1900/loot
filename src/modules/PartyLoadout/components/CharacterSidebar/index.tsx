import React from 'react'
import { CharacterCard } from '../CharacterCard'
import './index.scss'
import { DropTarget } from 'react-dnd';
import CharacterChip from '../../../Core/CharacterChip';


export const characterSidebarTarget = {
    drop(props, monitor) {
        props.partyDeleteCharacter(monitor.getItem().id)
    }
}

export const CharacterSidebar = (props: any) => {
    const { party, characters, connectDropTarget } = props

    const filteredCharacters = ((party, characters) => {
        const partyCharacterIds = party.characters.map(c => c.__uuid)
        return characters.filter(c => !partyCharacterIds.contains(c.__uuid))
    })(party, characters)

    return connectDropTarget(
        <div className='CharacterSidebar'>
            {filteredCharacters.size === 0 ? 
                <div className='CharacterSidebar__empty'>No Characters Available</div>: 
                null
            }
            {filteredCharacters.map(character => (
                <div key={character.__uuid}>
                    <CharacterChip character={character} showImage={true} />
                </div>
            ))}
        </div>
    )
}

export default DropTarget('CharacterAvatar', characterSidebarTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(CharacterSidebar)