import React from 'react'
import { connect } from 'react-redux'
import { PackItem } from '../PackItem';
import { PackCharacterCard } from '../PackCharacterCard';
import { PackCharacterItemList } from '../PackCharacterItemList';
import { Icon } from '../Icon';
import { icons } from '../Icon/icons'

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = () => ({})
export const Sandbox1 = connect(mapStateToProps, mapDispatchToProps)((props) => (
    <div className='Sandbox1'>
        <div style={{display: 'flex', width: 1060, padding: 8, flexWrap: 'wrap'}}>
            {props.characters.map(c => 
                <div style={{display: 'flex', marginBottom:8, marginRight: 8}}>
                    <PackCharacterCard character={c} />
                    
                </div>
            )}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', width: 313, height: '100vh', overflowY: 'auto' }}>
            {props.items.map(w => (
                <div style={{width: '300px'}}>
                    <PackItem item={w} />
                </div>
            ))}
        </div>
    </div>
))

export const Sandbox2 = ({ _icons }) => (
    <div className='Sandbox2' style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
        {icons.map(icon => (
            <Icon size={64} icon={icon} fill={'black'} />
        ))}
    </div>
)