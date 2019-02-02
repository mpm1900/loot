import React from 'react'
import { Icon } from '../Icon';
import './index.css'

const TypeIconTable = {
    'Charm': 'gem-pendant',
    'Head': 'barbute',
}

export const Armor = (props) => (
    <div className={"Armor Item__rarity--" + props.armor.rarity}>
        <div className="Armor__armor">{props.armor.stats.armor}</div>
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div style={{width: '100%', fontSize: '18px' }}><strong>{props.armor.name}</strong></div>
                <div style={{paddingTop: '4px'}}>
                    <Icon icon={TypeIconTable[props.armor.stats.type]} fill={'white'} size={24} />
                </div>
                <div style={{marginLeft: '4px'}}>
                    <div style={{width: '100%' }}>Level {props.armor.level}</div>
                    <div style={{width: '100%' }}>{props.armor.description}</div>
                </div>
            </div>
        </div>
        { props.armor.modifiers && props.armor.modifiers.size > 0 ? 
            <div className="Item__modifiers">
                {props.armor.modifiers.map(mod => (
                    <div className={"Item__modifier--" + (mod.buff ? 'buff' : 'debuff')}>{mod.description}</div>
                ))}
            </div>: null }
    </div>
)