import React from 'react'
import './index.scss'

export const TopBar = (props) => {
    const { style, children } = props
    return (
        <div className='TopBar' style={{ ...(style || {}) }}>
            <div>{children}</div>
        </div>
    )
}