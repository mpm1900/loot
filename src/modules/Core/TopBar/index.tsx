import React from 'react'
import './index.scss'

export const TopBar = (props) => {
    const { style, children, condensed } = props
    const className = 'TopBar ' + (condensed ? 'condensed' : '')
    const topbarStyle = { ...(style || {}) }
    return (
        <div className={className} style={topbarStyle}>
            <div>{children}</div>
        </div>
    )
}