import React, { useState } from 'react'
import './index.scss'

export const Button = (props: any) => {
    const { style, children, onClick, type = 'primary' } = props
    return (
        <div className='Button2'>
            <button className={`Button2--${type}`} onClick={onClick} style={style}>
                {children}
            </button>
        </div>
    )
}