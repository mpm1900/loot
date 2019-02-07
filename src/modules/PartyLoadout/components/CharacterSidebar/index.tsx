import React from 'react'
import { CharacterCard } from '../CharacterCard'
import './index.scss'

export const CharacterSidebar = (props: any) => {
    const { party, characters } = props

    const filteredCharacters = ((party, characters) => {
        const partyCharacterIds = party.characters.map(c => c.__uuid)
        return characters.filter(c => !partyCharacterIds.contains(c.__uuid))
    })(party, characters)

    return (
        <div className='CharacterSidebar'>
            {filteredCharacters.size === 0 ? 
                <div className='CharacterSidebar__empty'>No Characters Available</div>: 
                null
            }
            {filteredCharacters.map(character => (
                <CharacterCard key={character.__uuid} character={character} />
            ))}
        </div>
    )
}

export default CharacterSidebar