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
import { Button } from '../../components/Button';



interface PartyLoadoutPropTypes {
    session: ClientSessionState
    activeCharacterId: string,
    partyAddItem: any,
    initializeState: any,
    partyUpdateActiveCharacterId: any,
    partySwapCharacters: any,
    isModal: boolean,
    onClose?: any,
    history: any,
}

class PartyLoadout extends React.Component {
    props: PartyLoadoutPropTypes

    goBattle = () => {
        this.props.history.push('/battle')
    }

    render() {
        const { session, partyUpdateActiveCharacterId, partySwapCharacters, isModal = false } = this.props
        console.log('static mods')
        console.log(session.party.activeCharacter ? session.party.activeCharacter.toJS() : null)
        const character = session.party.activeCharacter ? session.party.activeCharacter : null
        return (
            <div style={{height: 'calc(100% - 57px)'}}>
                <TopBar style={{ paddingRight: 0 }}>
                    <strong>Session Party Loadout</strong>
                    { !isModal ?
                        <Button style={{padding: '0 16px', marginRight: 4 }} onClick={() => this.goBattle()}>Ready!</Button>
                    : null }
                    {isModal ? <Icon icon='split-cross' size={36} fill={'rgba(255,255,255,0.54)'} style={{
                        cursor: 'pointer',
                        marginRight: 8,
                    }} onClick={() => this.props.onClose() }/> : null }
                </TopBar>
                <div className='PartyLoadout'>
                    <div className='PartyLoadout__main'>
                        <CharacterSelectSidebar 
                            characters={session.party.characters} 
                            activeCharacterId={session.party.activeCharacterId}
                            partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                            partySwapCharacters={partySwapCharacters}
                        />
                        <div style={{padding: 8, overflowY: 'auto', height: '100%'}}>{session.party.activeCharacter ? 
                            <div style={{display: 'flex', alignItems: 'stretch', height: '100%'}}>
                                <div style={{display: 'flex', flexDirection: 'column', minWidth: 407, width: '33%'}}>
                                    <CharacterCard character={character} />
                                </div>
                                <div style={{margin: '0', flex: 1, maxHeight: '100%', overflowY: 'auto'}}>
                                    <PackCharacterItemList character={character} />
                                </div>
                            </div>
                        : null }</div>
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
    partySwapCharacters: SessionActions.partySwapCharacters,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PartyLoadout)