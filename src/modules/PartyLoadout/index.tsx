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
import { Icon } from '../../components/Icon';



interface PartyLoadoutPropTypes {
    session: ClientSessionState
    activeCharacterId: string,
    partyAddItem: any,
    initializeState: any,
    partyUpdateActiveCharacterId: any,
    isModal: boolean,
    onClose?: any,
}

class PartyLoadout extends React.Component {
    props: PartyLoadoutPropTypes

    render() {
        const { session, initializeState, partyUpdateActiveCharacterId, partyAddItem, isModal = false } = this.props
        console.log('static mods')
        console.log(session.party.activeCharacter ? session.party.activeCharacter.toJS() : null)
        const character = session.party.activeCharacter ? session.party.activeCharacter : null
        return (
            <div style={{height: 'calc(100% - 57px)'}}>
                <TopBar>
                    <strong>Session Party Loadout</strong>
                    {isModal ? <Icon icon='split-cross' size={36} fill={'rgba(0,0,0,0.54)'} style={{
                        cursor: 'pointer'
                    }} onClick={() => this.props.onClose() }/> : null }
                </TopBar>
                <div className='PartyLoadout'>
                    <CharacterSelectSidebar 
                        characters={session.party.characters} 
                        activeCharacterId={session.party.activeCharacterId}
                        partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                        isModal={isModal}
                    />
                    <div className='PartyLoadout__main'>
                        {session.party.activeCharacter ? 
                            <div style={{display: 'flex', alignItems: 'stretch', height: '100%'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <CharacterCard character={character} />
                                </div>
                                <div style={{margin: '0', flex: 1, maxHeight: '100%', overflowY: 'auto'}}>
                                    <PackCharacterItemList character={character} />
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