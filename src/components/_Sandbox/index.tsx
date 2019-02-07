import React from 'react'
import { connect } from 'react-redux'
import { Icon } from '../Icon';
import { icons } from '../Icon/icons'

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = () => ({})
export const Sandbox1 = connect(mapStateToProps, mapDispatchToProps)((props) => (
    <div className='Sandbox1'>
    </div>
))

export const Sandbox2 = ({ _icons }) => (
    <div className='Sandbox2' style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
        {icons.map(icon => (
            <Icon size={64} icon={icon} fill={'black'} />
        ))}
    </div>
)