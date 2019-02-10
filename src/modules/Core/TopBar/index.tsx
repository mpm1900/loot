import React from 'react'
import './index.scss'

export const TopBar = (props) => {
    const { style, children, condensed } = props
    return (
        <div className={'TopBar ' + (condensed ? 'condensed' : '')} style={{ ...(style || {}) }}>
            <div>{children}</div>
        </div>
    )
}