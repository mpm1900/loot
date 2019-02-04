import React from 'react'
import './index.scss'
import { CharacterCard } from '../CharacterCard';
import { List } from 'immutable';

export class CharacterSidebar extends React.Component {
    props: any;
    state: any;

    constructor(props: any) {
        super(props)
    }

    get characters() {
        const partyCharacters = this.props.party.characters.map(c => c.__uuid)
        return this.props.characters.filter(c => !partyCharacters.contains(c.__uuid))
    }

    render() {
        return (
            <div className='CharacterSidebar'>
                {this.characters.size === 0 ? <div style={{ width: '100%', textAlign: 'center', height: 72, lineHeight: '72px'}}>
                    No Characters Available
                </div> : null }
                {this.characters.map(character => (
                    <CharacterCard key={character.__uuid} character={character} />
                ))}
            </div>
        )
    }
}

export default CharacterSidebar