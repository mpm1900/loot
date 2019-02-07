import React from 'react'
import { connect } from 'react-redux'
import * as SessionActions from '../../state/actions/session.actions'
import { bindActionCreators } from 'redux'
import CharacterSelectSidebar from './components/CharacterSelectSidebar'
import { PackCharacterItemList } from '../../components/PackCharacterItemList'
import { CharacterCard } from './components/CharacterCard'
import { ClientSessionState } from '../../state/reducers/session.state'
import SessionSidebar from './components/SessionSidebar'
import { TopBar } from '../Core/TopBar'
import { Icon } from '../../components/Icon'
import { Button } from '../../components/Button'
import './index.scss'

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

const SessionTopBar = (props) => {
    const { isModal, history, onClose } = props
    const fill = 'rgba(255,255,255,0.54)'
    return (
        <TopBar style={{ paddingRight: 0 }}>
            <strong>Session Party Loadout</strong>
            { !isModal ? <Button style={{padding: '0 16px', marginRight: 4 }} onClick={() => history.push('/battle')}>Ready!</Button> : null }
            { isModal ? <Icon icon='split-cross' size={36} fill={fill} style={{ cursor: 'pointer', marginRight: 8 }} onClick={onClose}/> : null }
        </TopBar>
    )
}

const SessionActiveCharacter = (props) => {
    const { character } = props
    return (
        <div style={{display: 'flex', alignItems: 'stretch', flex: 1, overflowY: 'auto', padding: 8}}>
            <div style={{display: 'flex', flexDirection: 'column', minWidth: 407, width: '33%'}}>
                <CharacterCard character={character} />
            </div>
            <div style={{margin: '0', flex: 1, maxHeight: '100%', overflowY: 'auto'}}>
                <PackCharacterItemList character={character} />
            </div>
        </div>
    )
}

const Session = (props: PartyLoadoutPropTypes) => {
    const { history, session: { party }, partyUpdateActiveCharacterId, partySwapCharacters, onClose, isModal } = props
    const character = party.activeCharacter ? party.activeCharacter : null

    return (
        <div className='Session'>
            <SessionTopBar isModal={isModal} history={history} onClose={onClose} />
            <div className='Session__main'>
                <div className='Session__details'>
                    <CharacterSelectSidebar 
                        characters={party.characters} 
                        activeCharacterId={party.activeCharacterId}
                        partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                        partySwapCharacters={partySwapCharacters}
                    />
                    {party.activeCharacter ? 
                        <SessionActiveCharacter character={character} />:
                        <div style={{ flex: 1 }}></div> 
                    }
                </div>
                <SessionSidebar />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    partyAddCharacter: SessionActions.partyAddCharacter,
    partyDeleteCharacter: SessionActions.partyDeleteCharacter,
    partyUpdateCharacter: SessionActions.partyUpdateCharacter,
    partyUpdateActiveCharacterId: SessionActions.partyUpdateActiveCharacterId,
    partySwapCharacters: SessionActions.partySwapCharacters,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Session)