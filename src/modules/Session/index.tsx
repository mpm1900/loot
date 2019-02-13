import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as SessionActions from '../../state/actions/session.actions'
import { bindActionCreators } from 'redux'
import CharacterSelect from './components/CharacterSelect'
import { CharacterItemList } from '../Core/PackCharacterItemList'
import { CharacterCard } from '../Core/CharacterCard'
import { ClientSessionState } from '../../state/reducers/session.state'
import SessionSidebar from './components/SessionSidebar'
import { TopBar } from '../Core/TopBar'
import { Icon } from '../Core/Icon'
import { Button } from '../Core/Button'
import { Character } from '../../types/character'
import './index.scss'
import { CharacterChip } from '../Core/CharacterChip';
import { ClientAuthState } from '../../state/reducers/auth.state';

interface PartyLoadoutPropTypes {
    session: ClientSessionState
    activeCharacterId: string,
    partyAddItem: any,
    initializeState: any,
    partyUpdateActiveCharacterId: any,
    partySwapCharacters: any,
    partyAddCharacter: any,
    characterLimit: number,
    isModal: boolean,
    viewOnly: boolean,
    onClose?: any,
    history: any,
    auth: ClientAuthState,
}

const SessionTopBar = (props: { isModal: boolean, history: any, onClose: any }) => {
    const { isModal, history, onClose } = props
    const fill = 'rgba(255,255,255,0.54)'
    return (
        <TopBar style={{borderBottom: 'none'}}>
            <strong>Session Party Loadout</strong>
            { !isModal ? <div style={{ display: 'flex'}}>
                <Button onClick={() => history.push('/battle/create')}>Create Room</Button>
                <Button onClick={() => history.push('/battle/find')}>Find Room</Button>
            </div> : null }
            { isModal ? <Button type='warning' onClick={onClose}>Close</Button> : null }
        </TopBar>
    )
}

const SessionActiveCharacter = (props: { character: Character }) => {
    const { character } = props
    return (
        <div style={{display: 'flex', flex: 1, padding: 8, maxHeight: 'calc(100% - 136px)', background: 'linear-gradient(175deg, hsl(0,0%,27%) 0%,hsl(0,0%,22%) 100%)' }}>
            { /* <CharacterCard character={character} /> */ }
            <CharacterChip character={character} showImage={true} />
            <div style={{margin: '0', flex: 1, overflowY: 'auto'}}>
                <CharacterItemList character={character} />
            </div>
        </div>
    )
}

const Session = (props: PartyLoadoutPropTypes) => {
    const { 
        auth, history, session: { sessionId, party }, 
        partyUpdateActiveCharacterId, partySwapCharacters, partyAddCharacter, 
        onClose, isModal, viewOnly = false
    } = props
    const character = party.activeCharacter ? party.activeCharacter : null

    useEffect(() => {
        if (!sessionId || !auth.loggedIn) history.push('/auth')
    }, [sessionId, auth])

    return (
        <div className='Session'>
            <SessionTopBar isModal={isModal} history={history} onClose={onClose} />
            <div className='Session__main'>
                <div className='Session__details'>
                    <CharacterSelect
                        characters={party.characters} 
                        activeCharacterId={party.activeCharacterId}
                        partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                        partySwapCharacters={partySwapCharacters}
                        partyAddCharacter={partyAddCharacter}
                        characterLimit={party.characterLimit}
                        viewOnly={viewOnly}
                    />
                    {party.activeCharacter ? 
                        <SessionActiveCharacter character={character} />:
                        <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.72)' }}></div> 
                    }
                </div>
                { !viewOnly ? <SessionSidebar /> : null }
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