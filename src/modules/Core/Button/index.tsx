import React, { useState } from 'react'
import './index.scss'

export const Button = (props: any) => {
    const [ isHovering, setIsHovering ] = useState(false)
    const { style, children, onClick } = props
    return (
        <div className='Button2' style={style}>
            <button onClick={onClick}>
                {children}
            </button>
        </div>
    )
}