import { AppRecord } from '..';

export enum ElementType {
    Default = 'Default',
    Fire = 'Fire',
    Water = 'Water',
    Thunder = 'Thunder',
    Grass = 'Grass',
    Earth = 'Earth',
    Ice = 'Ice',
    Dragon = 'Dragon',
    Light = 'Light',
    Dark = 'Dark',
}

export const ElementTypes = [
    ElementType.Fire,
    ElementType.Water,
    ElementType.Thunder,
    ElementType.Grass,
    ElementType.Earth,
    ElementType.Ice,
    ElementType.Dragon,
    ElementType.Light,
    ElementType.Dark ,
]

export type sElement = {
    type: ElementType,
    power: number,
}
export type iElement = {
    type?: ElementType,
    power?: number,
}
const defaultElement: iElement = {
    type: ElementType.Default,
    power: 0
}
export class Element extends AppRecord implements iElement {
    public readonly type: ElementType;
    public readonly power: number;

    constructor(args?: iElement) {
        args ?
            super({ ...defaultElement, ...args } as iElement) :
            super(defaultElement)
    }

    with(values: iElement): Element {
        return super.with(values) as Element
    }

    serialize(): sElement {
        return {
            type: this.type,
            power: this.power,
        }
    }

    static deserialize(sElement: sElement): Element {
        return new Element({
            type: sElement.type,
            power: sElement.power,
        })
    }
}

export const FireElement = (power: number) => new Element({ type: ElementType.Fire, power })
export const WaterElement = (power: number) => new Element({ type: ElementType.Water, power })
export const ThunderElement = (power: number) => new Element({ type: ElementType.Thunder, power })
export const GrassElement = (power: number) => new Element({ type: ElementType.Grass, power })
export const EarthElement = (power: number) => new Element({ type: ElementType.Earth, power })
export const IceElement = (power: number) => new Element({ type: ElementType.Ice, power })
export const DragonElement = (power: number) => new Element({ type: ElementType.Dragon, power })
export const LightElement = (power: number) => new Element({ type: ElementType.Light, power })
export const DarkElement = (power: number) => new Element({ type: ElementType.Dark, power })

const strong = 2;
const neutral = 1;
const weak = 0.5;

export const ElementsTable = {
    [ElementType.Fire]: {
        [ElementType.Fire]: weak,
        [ElementType.Water]: weak,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: strong,
        [ElementType.Earth]: weak,
        [ElementType.Ice]: strong,
        [ElementType.Dragon]: weak,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Water]: {
        [ElementType.Fire]: strong,
        [ElementType.Water]: weak,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: weak,
        [ElementType.Earth]: strong,
        [ElementType.Ice]: neutral,
        [ElementType.Dragon]: weak,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Thunder]: {
        [ElementType.Fire]: neutral,
        [ElementType.Water]: strong,
        [ElementType.Thunder]: weak,
        [ElementType.Grass]: weak,
        [ElementType.Earth]: neutral,
        [ElementType.Ice]: neutral,
        [ElementType.Dragon]: neutral,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Grass]: {
        [ElementType.Fire]: weak,
        [ElementType.Water]: strong,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: weak,
        [ElementType.Earth]: strong,
        [ElementType.Ice]: neutral,
        [ElementType.Dragon]: weak,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Earth]: {
        [ElementType.Fire]: neutral,
        [ElementType.Water]: neutral,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: neutral,
        [ElementType.Earth]: weak,
        [ElementType.Ice]: strong,
        [ElementType.Dragon]: neutral,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Ice]: {
        [ElementType.Fire]: weak,
        [ElementType.Water]: weak,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: strong,
        [ElementType.Earth]: neutral,
        [ElementType.Ice]: weak,
        [ElementType.Dragon]: strong,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Dragon]: {
        [ElementType.Fire]: neutral,
        [ElementType.Water]: neutral,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: neutral,
        [ElementType.Earth]: neutral,
        [ElementType.Ice]: weak,
        [ElementType.Dragon]: strong,
        [ElementType.Light]: neutral,
        [ElementType.Dark]: neutral,
    },
    [ElementType.Light]: {
        [ElementType.Fire]: neutral,
        [ElementType.Water]: neutral,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: neutral,
        [ElementType.Earth]: neutral,
        [ElementType.Ice]: neutral,
        [ElementType.Dragon]: neutral,
        [ElementType.Light]: weak,
        [ElementType.Dark]: strong,
    },
    [ElementType.Dark]: {
        [ElementType.Fire]: neutral,
        [ElementType.Water]: neutral,
        [ElementType.Thunder]: neutral,
        [ElementType.Grass]: neutral,
        [ElementType.Earth]: neutral,
        [ElementType.Ice]: neutral,
        [ElementType.Dragon]: neutral,
        [ElementType.Light]: strong,
        [ElementType.Dark]: weak,
    }
};