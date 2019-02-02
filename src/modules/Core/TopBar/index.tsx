import React from 'react'
import './index.scss'

export const TopBar = (props) => {
    return (
        <div className='TopBar' style={{ ...(props.style || {}) }}>
            {props.children}
        </div>
    )
}