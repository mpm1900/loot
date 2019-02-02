import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SessionActions from '../../../../state/actions/session.actions'
import './index.scss' 
import ItemSelectSidebar from '../ItemSelectSidebar';
import { TopBar } from '../../../Core/TopBar';
import { Button } from '../../../../components/Button';
import CharacterSidebar from '../CharacterSidebar';

interface iSessionSidebarProps {
    session?: any
    partyAddItem?: any
} 
export class SessionSidebar extends React.Component {
    props: iSessionSidebarProps;
    state: any;

    constructor(props: iSessionSidebarProps) {
        super(props),
        this.state = {
            activeKey: 'items'
        }
    }

    getActiveComponent() {
        switch (this.state.activeKey) {
            case 'items': return (
                <ItemSelectSidebar
                    items={this.props.session.party.items}
                    partyAddItem={this.props.partyAddItem}
                />
            )
            case 'characters': return (
                <CharacterSidebar party={this.props.session.party} characters={this.props.session.characters} />
            )
            case 'packs': return <div>packs</div>
            default: return <div></div>
        }
    }

    render() {
        if (!this.props.session) return <div></div>
        return (
            <div className='SessionSidebar'>
                <TopBar style={{padding: '0 2px'}}>
                    <div onClick={() => this.setState({ activeKey: 'items' })} className={'SessionSidebar__option' + (this.state.activeKey === 'items' ? ' active' : '')}>Items</div>
                    <div onClick={() => this.setState({ activeKey: 'characters' })} className={'SessionSidebar__option' + (this.state.activeKey === 'characters' ? ' active' : '')}>Characters</div>
                    <div onClick={() => this.setState({ activeKey: 'packs' })} className={'SessionSidebar__option' + (this.state.activeKey === 'packs' ? ' active' : '')}>Packs</div>
                </TopBar>
                {this.getActiveComponent()}
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
export default connect(mapStateToProps, mapDispatchToProps)(SessionSidebar)