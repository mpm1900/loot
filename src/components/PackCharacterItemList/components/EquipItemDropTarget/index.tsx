import React from 'react'
import { DropTarget, DndComponentClass } from 'react-dnd';
import { Character } from '../../../../types/character';
import { Item, ItemType } from '../../../../types/item';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ClientSessionState } from '../../../../state/reducers/session.state';
import { partyUpdateCharacter, partyAddItem } from '../../../../state/actions/session.actions';

export const handleExistingItem = (props, item) => {
    const _item = props.character.getItem(item.subType)
    if (_item) props.partyAddItem(_item.__uuid)
}

export const updateCharacter = (props: EquipItemDropTargetProps, item: Item) => {
    const { character } = props
    console.log(character.equipItem(item).serialize())
    props.partyUpdateCharacter(character.equipItem(item))
}

const equipItemDropTargetTarget = {
    canDrop(props, monitor) {
        const item: Item = monitor.getItem().item
        if (props.itemType)
            return props.itemType === item.subType  
        return item.type === ItemType.Equipable
    },

    drop(props: EquipItemDropTargetProps, monitor, component) {
        const item = monitor.getItem().item
        const _item = props.session.items.find(i => i.__uuid === item.__uuid)
        handleExistingItem(props, item)
        updateCharacter(props, _item)
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        itemType: monitor.getItemType(),
    }
}

type EquipItemDropTargetProps = {
    children: any
    connectDropTarget?: any,
    setCharacter: any,
    addItemByIds: any,
    character: Character,
    itemType: any,
    session: ClientSessionState,
    partyUpdateCharacter: Function,
}
export class _EquipItemDropTarget extends React.Component {
    props: EquipItemDropTargetProps

    constructor(props) {
        super(props)
    }
    render() { 
        return this.props.connectDropTarget(this.props.children)
    }
}

const mapStateToProps = (state) => ({ ...state, })
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        partyAddItem,
        partyUpdateCharacter
    }, dispatch)
}
export const EquipItemDropTarget = connect(mapStateToProps, mapDispatchToProps)(DropTarget('PackItem', equipItemDropTargetTarget, collect)(_EquipItemDropTarget))