import React from 'react'
import './index.scss'

export const Button = (props) => (
    <a style={{
        ...(props.style || {})
    }} onClick={() => props.onClick ? props.onClick(): null} className='Button'>{props.children}</a>
)