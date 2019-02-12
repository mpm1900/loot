import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SessionActions from '../../../../state/actions/session.actions'
import './index.scss' 
import ItemSelectSidebar from '../ItemSelectSidebar';
import { TopBar } from '../../../Core/TopBar';
import CharacterSidebar from '../CharacterSidebar';

interface iSessionSidebarProps {
    session?: any
    partyAddItem?: any
} 

enum SessionSidebarKey {
    Items = 'Items',
    Characters = 'Heros',
    Packs = 'Packs',
    Loadouts = 'Loadouts',
}

const SessionSidebar = (props: iSessionSidebarProps) => {
    const [ activeKey, setActiveKey ] = useState(SessionSidebarKey.Characters)
    const { session } = props

    const getActiveComponent = (key: SessionSidebarKey, props) => {
        switch (key) {
            case SessionSidebarKey.Items: return (
                <ItemSelectSidebar
                    party={props.session.party}
                    items={props.session.items}
                />
            )
            case SessionSidebarKey.Characters: return (
                <CharacterSidebar
                    party={props.session.party}
                    characters={props.session.characters}
                    characterLimit={props.session.party.characterLimit}
                    partyDeleteCharacter={props.partyDeleteCharacter}
                />
            )
            case SessionSidebarKey.Packs: return (
                <div>packs</div>
            )
            default: return <div></div>
        }
    }

    const isActive = (key: SessionSidebarKey): boolean => key === activeKey

    if (!session) return <div></div>
    return (
        <div className='SessionSidebar'>
            <TopBar style={{borderLeft: 'none'}}>
                {[SessionSidebarKey.Characters, SessionSidebarKey.Items, SessionSidebarKey.Packs, SessionSidebarKey.Loadouts].map(key => (
                    <div key={key} onClick={() => setActiveKey(key)} className={isActive(key) ? 'active' : ''}>
                        {key}
                    </div>
                ))}
            </TopBar>
            {getActiveComponent(activeKey, props)}
        </div>
    )
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    partyAddCharacter: SessionActions.partyAddCharacter,
    partyDeleteCharacter: SessionActions.partyDeleteCharacter,
    partyUpdateCharacter: SessionActions.partyUpdateCharacter,
    partyUpdateActiveCharacterId: SessionActions.partyUpdateActiveCharacterId,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SessionSidebar)