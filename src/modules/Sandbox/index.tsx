import React from 'react'
import { Icon } from '../Core/Icon';
import { icons } from '../Core/Icon/icons'

export const Sandbox2 = ({ _icons }) => (
    <div className='Sandbox2' style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
        {icons.map(icon => (
            <Icon size={64} icon={icon} fill={'black'} />
        ))}
    </div>
)