import { AppRecord } from '..';
import { sElement, Element } from '../element';


export type sItemStats = {
    power: number,
    armor: number,
    range: number,
    accuracy: number,
    affinity: number,
    criticalRatio: number,

    element: sElement | null,
    status: sElement | null,
}
export type iItemStats = {
    power?: number,
    armor?: number,
    range?: number,
    accuracy?: number
    affinity?: number,
    criticalRatio?: number,

    element?: Element | null,
    status?: Element | null,
}
export const defaultItemStats: iItemStats = {
    power: 0,
    armor: 0,
    range: 0,
    accuracy: 0,
    affinity: 0,
    criticalRatio: 0,
    element: null,
    status: null
}
export class ItemStats extends AppRecord implements iItemStats {
    public readonly power: number
    public readonly armor: number
    public readonly range: number
    public readonly accuracy: number
    public readonly affinity: number
    public readonly criticalRatio: number
    public readonly element: Element | null
    public readonly status: Element | null

    constructor(args?: iItemStats) {
        args ?
            super({ ...defaultItemStats, ...args } as iItemStats) :
            super(defaultItemStats)
    }

    with(values: iItemStats): ItemStats {
        return super.with(values) as ItemStats
    }

    serialize(): sItemStats {
        return {
            power: this.power,
            armor: this.armor,
            range: this.range,
            accuracy: this.accuracy,
            affinity: this.affinity,
            criticalRatio: this.criticalRatio,
            element: this.element ? this.element.serialize() : null,
            status: this.status ? this.status.serialize() : null,
        }
    }

    static deserialize(sItemStats: sItemStats): ItemStats {
        return new ItemStats({
            power: sItemStats.power,
            armor: sItemStats.armor,
            range: sItemStats.range,
            accuracy: sItemStats.accuracy,
            affinity: sItemStats.affinity,
            criticalRatio: sItemStats.criticalRatio,
            element: sItemStats.element ? Element.deserialize(sItemStats.element) : null,
            status: sItemStats.status ? Element.deserialize(sItemStats.status) : null
        })
    }
}