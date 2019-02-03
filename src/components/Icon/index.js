import React from 'react'
import icons from './icons.svg'
export { icons } from './icons';

export const Icon = ({ icon, size = 24, fill = 'black', style = {}, onClick = null }) => {
    return (
        <svg style={{height: size, width: size, fill, ...style }} onClick={event => onClick ? onClick(event) : null }>
            <use xlinkHref={`${icons}#${icon}`} />
        </svg>
    )
}