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
    Characters = 'Characters',
    Packs = 'Packs',
}

const SessionSidebar = (props: iSessionSidebarProps) => {
    const [ activeKey, setActiveKey ] = useState(SessionSidebarKey.Items)
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
            <TopBar>
                <div onClick={() => setActiveKey(SessionSidebarKey.Items)} className={isActive(SessionSidebarKey.Items) ? 'active' : ''}>
                    {SessionSidebarKey.Items}
                </div>
                <div onClick={() => setActiveKey(SessionSidebarKey.Characters)} className={isActive(SessionSidebarKey.Characters) ? 'active' : ''}>
                    {SessionSidebarKey.Characters}
                </div>
                <div onClick={() => setActiveKey(SessionSidebarKey.Packs)} className={isActive(SessionSidebarKey.Packs) ? 'active' : ''}>
                    {SessionSidebarKey.Packs}
                </div>
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