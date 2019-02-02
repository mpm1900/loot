import React from 'react'
import { connect } from 'react-redux'
import * as SessionActions from '../../state/actions/session.actions'
import { bindActionCreators } from 'redux'
import CharacterSelectSidebar from './components/CharacterSelectSidebar'
import { List } from 'immutable'
import ItemSelectSidebar from './components/ItemSelectSidebar'
import { PackCharacterCard } from '../../components/PackCharacterCard'
import { PackCharacterItemList } from '../../components/PackCharacterItemList'
import { Character } from '../../types/character'
import { Item } from '../../types/item'
import { Party } from '../../types/party'
import './index.scss'
import { CharacterCard } from './components/CharacterCard';
import { BattleCharacter } from '../Battle/components/BattleCharacter';
import { ClientSessionState } from '../../state/reducers/session.state';
import SessionSidebar from './components/SessionSidebar';
import { TopBar } from '../Core/TopBar';



interface PartyLoadoutPropTypes {
    session: ClientSessionState
    activeCharacterId: string,
    partyAddItem: any,
    initializeState: any,
    partyUpdateActiveCharacterId: any
}

class PartyLoadout extends React.Component {
    props: PartyLoadoutPropTypes

    render() {
        const { session, initializeState, partyUpdateActiveCharacterId, partyAddItem,  } = this.props
        return (
            <div style={{height: 'calc(100% - 57px)'}}>
                <TopBar>sdflk</TopBar>
                <div className='PartyLoadout'>
                    <CharacterSelectSidebar 
                        characters={session.party.characters} 
                        activeCharacterId={session.party.activeCharacterId}
                        partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                    />
                    <div className='PartyLoadout__main'>
                        {session.party.activeCharacter ? 
                            <div style={{display: 'flex', alignItems: 'stretch', height: '100%'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <CharacterCard character={session.party.activeCharacter} />
                                </div>
                                <div style={{margin: '0', flex: 1, maxHeight: '100%', overflowY: 'auto'}}>
                                    <PackCharacterItemList character={session.party.activeCharacter} />
                                </div>
                            </div>
                        : null }
                    </div>
                    <SessionSidebar />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    partyAddCharacter: SessionActions.partyAddCharacter,
    partyDeleteCharacter: SessionActions.partyDeleteCharacter,
    partyUpdateCharacter: SessionActions.partyUpdateCharacter,
    partyUpdateActiveCharacterId: SessionActions.partyUpdateActiveCharacterId,
    partyAddItem: SessionActions.partyAddItem,
    partyDeleteItem: SessionActions.partyDeleteItem
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PartyLoadout)