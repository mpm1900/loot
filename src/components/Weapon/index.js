import React from 'react'
import './index.css'
import { TypeChip } from '../TypeChip';

export const Weapon = (props) => (
    <div className={"Item Item__rarity--" + props.weapon.rarity}>
        <div style={{width: '100%', fontSize: '18px' }}><strong>{props.weapon.name}</strong></div>
        <div style={{width: '100%' }}>Level {props.weapon.level}</div>
        <div style={{width: '100%' }}>{props.weapon.description}</div>
        <div className="Item__stats">
            <div className="Item__stats--power">{props.weapon.stats.power}</div>
            { props.weapon.element ? <div className="Item__stats--group">
                <TypeChip typeString={props.weapon.element.type} power={props.weapon.element.power} />
            </div> : null }
            <pre className="Item__stats--group">
                <div className="Item__stats--accuracy">ACC: {props.weapon.stats.accuracy}</div>
                <div className="Item__stats--range">RNG: {props.weapon.stats.range}</div>
            </pre>
            <pre className="Item__stats--group">
                <div className="Item__stats--accuracy">AFF: {props.weapon.stats.affinity}</div>
                <div className="Item__stats--range">CR%: {props.weapon.stats.criticalRatio}</div>
            </pre>
        </div>
        { props.weapon.modifiers && props.weapon.modifiers.size > 0 ? 
            <div className="Item__modifiers">
                {props.weapon.modifiers.map(mod => (
                    <div className={"Item__modifier--" + (mod.buff ? 'buff' : 'debuff')}>{mod.description}</div>
                ))}
            </div>: null }
        <div style={{flex: 1}}></div>
    </div>
)