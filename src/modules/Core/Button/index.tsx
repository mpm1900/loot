import React, { useState } from 'react'
import './index.scss'

export const Button = (props: any) => {
    const [ isHovering, setIsHovering ] = useState(false)
    const { style, children, onClick } = props
    return (
        <div className='Button2'>
            <button onClick={onClick} style={style}>
                {children}
            </button>
        </div>
    )
}