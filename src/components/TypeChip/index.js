import React from 'react';
import { Icon } from '../Icon';
import { ElementType } from '../../types/element';

let styles = {};
styles[ElementType.Fire] = {
    fill: 'red',
    color: 'white',
}
styles[ElementType.Water] = {
    fill: '#3A5894',
    color: 'white',
}
styles[ElementType.Grass] = {
    fill: '#489030',
    color: 'white',
}
styles[ElementType.Thunder] = {
    fill: '#FFD300',
    color: 'white',
}
styles[ElementType.Earth] = {
    fill: '#DCC7B8',
    color: 'white',
}
styles[ElementType.Ice] = {
    fill: '#b4cffa',
    color: 'white',
}
styles[ElementType.Dragon] = {
    fill: '#BDA0CB',
    color: 'white',
}
styles[ElementType.Light] = {
    //fill: '#EEE8AA',
    fill: 'black',
    color: 'white',
}
styles[ElementType.Dark] = {
    fill: 'black',
    color: 'white',
}

const iconSize = 32

// 

export const FireIcon = (fill, size) => <Icon icon="small-fire" fill={fill} size={size} />
// water-drop is good too
export const WaterIcon = (fill, size) => <Icon icon="drop" fill={fill} size={size} />
// oak-leaf is good too
export const GrassIcon = (fill, size) => <Icon icon="linden-leaf" fill={fill} size={size} />
export const ThunderIcon = (fill, size) => <Icon icon="lightning-helix" fill={fill} size={size} />
export const EarthIcon = (fill, size) => <Icon icon="mountaintop" fill={fill} size={size} />
export const IceIcon = (fill, size) => <Icon icon="snowflake-2" fill={fill} size={size} />
export const DragonIcon = (fill, size) => <Icon icon="pick-of-destiny" fill={fill} size={size} />
export const LightIcon = (fill, size) => <Icon icon="lantern" fill={fill} size={size} />
export const DarkIcon = (fill, size) => <Icon icon="crowned-skull" fill={fill} size={size} />

export const getIcon = ({ type, fill, size = iconSize }) => {
    if (type === ElementType.Fire) return FireIcon(fill, size)
    if (type === ElementType.Water) return WaterIcon(fill, size)
    if (type === ElementType.Grass) return GrassIcon(fill, size)
    if (type === ElementType.Thunder) return ThunderIcon(fill, size)
    if (type === ElementType.Earth) return EarthIcon(fill, size)
    if (type === ElementType.Ice) return IceIcon(fill, size)
    if (type === ElementType.Dragon) return DragonIcon(fill, size)
    if (type === ElementType.Light) return LightIcon(fill, size)
    if (type === ElementType.Dark) return DarkIcon(fill, size)
}

export const TypeChip = ({ typeString, power = null, size, fill = 'black', style = {} }) => (
    <div className="TypeChip" style={{
        fontWeight: 'bold',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        ...styles[typeString],
        ...style,
    }}>
        {getIcon({type: typeString, fill: fill || styles[typeString].fill, size})}
        {power ? <span style={{marginLeft: 8, fontSize: 20}}>{power}</span> : null}
    </div>
)