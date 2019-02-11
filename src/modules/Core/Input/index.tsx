import React from 'react'
import './index.scss'


export const Input = (props) => {
    const { value, name, type = 'text', onChange, style, placeholder } = props
    return (
        <div className='Input'>
            <input type={type} 
                style={style}
                name={name} 
                value={value} 
                placeholder={placeholder}
                onChange={onChange ? onChange : () => null} 
            />
        </div>
    )
}