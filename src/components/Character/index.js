import React from 'react'
import './index.css'
import { Weapon } from '../Weapon';
import { Armor } from '../Armor';
import { TypeChip, getIcon } from '../TypeChip';

const pickHex = (color1, color2, weight) => {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

export const CharacterDetail = (props) => (
    <div className="Character">
        <span><strong>{props.character.name}</strong> Level {props.character.level}</span>
        <div className="Character__health">
            <div style={{width: (props.character.health / props.character.maxHealth * 100) + '%', backgroundColor: 'rgb(' + pickHex([0, 255, 0], [255, 0, 0], props.character.health / props.character.maxHealth) + ')'}}></div>
            <span>({props.character.health} / {props.character.maxHealth})</span>
        </div>
        <div className="Character__body">
            <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                <div className="Character__body__stats">
                    <div style={{display: 'flex'}}>{props.character.type.map(type => <TypeChip typeString={type} />)}</div>
                    <div><strong>Strength</strong> {props.character.strength}</div>
                    <div><strong>Special</strong> {props.character.special}</div>
                    <div><strong>Speed</strong> {props.character.speed}</div>
                    <div><strong>Memory</strong> {props.character.memory}</div>
                    <div><strong>Luck</strong> {props.character.luck}</div>
                    <div><strong>Poison</strong> ({props.character.status.poison.value}/{props.character.status.poison.max})</div>
                    <div><strong>Sleep</strong> ({props.character.status.sleep.value}/{props.character.status.sleep.max})</div>
                    <div><strong>Paraylsis</strong> ({props.character.status.paralysis.value}/{props.character.status.paralysis.max})</div>
                    <div><strong>Burn</strong> ({props.character.status.paralysis.value}/{props.character.status.burn.max})</div>

                    <div style={{display: 'flex'}}>
                            <div><strong style={{fontSize: '48px'}}>{props.character.power}</strong></div>
                            <div style={{fontSize: '34px', flex: 1}}>{props.character.weapon.element ? <div style={{display: 'flex', marginTop: 16}}> 
                                <div style={{marginLeft: 8, marginRight: 4}}>{' / ' + props.character.weapon.element.power}</div> 
                                <TypeChip typeString={props.character.weapon.element.type} size={30} />
                            </div>: null }</div>
                    </div>
                    <div><strong style={{fontSize: '36px'}}>{props.character.armor}</strong></div>

                    { props.character.statusModifiers && props.character.statusModifiers.size > 0 ? 
                        <div className="Item__modifiers">
                            {props.character.statusModifiers.map(mod => (
                                <div>
                                    <div>{mod.name}</div>
                                    <div className={"Item__modifier--" + (mod.buff ? 'buff' : 'debuff')}>{mod.description}</div>
                                </div>
                            ))}
                        </div>: null }
                </div>
                <div style={{flex: 1}}></div>
            </div>
            <div className="Character__body__items">
                <Weapon weapon={props.character.weapon} />
                <Armor armor={props.character.charm} />
                <Armor armor={props.character.head} />
            </div>
        </div>
    </div>
)