import React from 'react'
import './index.scss'

export const pickHex = (color1, color2, weight) => {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

const getDefaultColor = (ratio: number) => {
    if (ratio >= 0.5) return pickHex([74, 103, 65], [190, 152, 5], ratio * 2 - 1)
    return pickHex([190, 152, 5], [255,0,0], ratio * 2)
}

export class ZeroGuage extends React.Component {
    props: any
    constructor(props) {
        super(props)

    }
    render() {
        const { value, max, height = 40, children, fills } = this.props
        return (
            <div className="ZeroGuage" style={{ height }}>
                <div className="ZeroGuage__fill" style={{width: `${100 * value / max}%`, height: height - 2, backgroundColor: fills ? `rgb(${pickHex(fills[0], fills[1], value / max)})`:  `rgb(${getDefaultColor(value / max)})` }}></div>
                <div className="ZeroGuage__content" style={{ height: height - 2, lineHeight: `${height}px` }}>
                    {children}
                </div>
            </div>
        )
    }
}