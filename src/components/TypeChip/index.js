import React from 'react';
import { Icon } from '../Icon';
import { ElementType } from '../../types/element';

let styles = {};
styles[ElementType.Fire] = {
    fill: 'red',
}
styles[ElementType.Water] = {
    fill: '#3A5894',
}
styles[ElementType.Grass] = {
    fill: '#489030',
}
styles[ElementType.Thunder] = {
    fill: '#FFD300',
}
styles[ElementType.Earth] = {
    fill: '#DCC7B8',
}
styles[ElementType.Ice] = {
    fill: '#b4cffa',
}
styles[ElementType.Dragon] = {
    fill: '#BDA0CB',
}
styles[ElementType.Light] = {
    fill: 'black',
}
styles[ElementType.Dark] = {
    fill: 'black',
}

const iconSize = 32
export const FireIcon = (size, fill) => <Icon icon="small-fire" fill={fill} size={size} />
export const WaterIcon = (size, fill) => <Icon icon="drop" fill={fill} size={size} />
export const ThunderIcon = (size, fill) => <Icon icon="lightning-helix" fill={fill} size={size} />
export const DragonIcon = (size, fill) => <Icon icon="pick-of-destiny" fill={fill} size={size} />
export const LightIcon = (size, fill) => <Icon icon="lantern" fill={fill} size={size} />
export const DarkIcon = (size, fill) => <Icon icon="crowned-skull" fill={fill} size={size} />

export const getIcon = ({ type, size, fill = iconSize }) => {
    if (type === ElementType.Fire) return FireIcon(size, fill)
    if (type === ElementType.Water) return WaterIcon(size, fill)
    if (type === ElementType.Thunder) return ThunderIcon(size, fill)
    if (type === ElementType.Dragon) return DragonIcon(size, fill)
    if (type === ElementType.Light) return LightIcon(size, fill)
    if (type === ElementType.Dark) return DarkIcon(size, fill)
}

export const TypeChip = ({ typeString, power = null, size = iconSize, fill = 'black', style = {} }) => (
    <div className="TypeChip" style={{
        fontWeight: 'bold',
        display: 'flex',
        height: '100%',
        color: 'white',
        alignItems: 'center',
        ...styles[typeString],
        ...style,
    }}>
        {getIcon({ 
            type: typeString, 
            fill: fill || styles[typeString].fill, 
            size: size
        })}
        {power ? <span style={{marginLeft: 8, fontSize: 20}}>{power}</span> : null}
    </div>
)