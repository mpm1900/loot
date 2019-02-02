import { List } from 'immutable';
import { DamageDefenseBuff } from '../modifiers/buff.mod';
import { RandFloat } from '../../types/random';
import { Modifier } from '../../types/modifier';
import { ElementType, Element, FireElement, WaterElement, LightElement } from '../../types/element';
import { Guage } from '../../types/guage';
import { Skill } from '../../types/skill';


export const FireBall = (level: number) => new Skill({
    name: 'Fire Ball',
    description: 'Big Ball of Fire',
    cooldown: new Guage({
        max: 3,
        min: 0,
        value: 0,
    }),
    elements: List.of<Element>(FireElement(level)),
    elementTypes: List.of<ElementType>(ElementType.Fire),
})

export const FLOODSpray = (level: number) => new Skill({
    name: 'F.L.U.D.D. Spray',
    description: 'Big Wave of Water',
    cooldown: new Guage({
        max: 4,
        min: 0,
        value: 0,
    }),
    elements: List.of<Element>(WaterElement(level)),
    elementTypes: List.of<ElementType>(ElementType.Water),
})

export const StarPower = (level: number) => new Skill({
    name: 'Star Power',
    description: 'Increased damage, Decreased Damage taken.',
    cooldown: new Guage({
        max: 4,
        min: 0,
        value: 0,
    }),
    targetModifiers: List<Modifier>(),
    modifiers: List.of<Modifier>(DamageDefenseBuff(1 / 100 * (100 + (level)))),
    elementTypes: List.of<ElementType>(ElementType.Light),
})

export const GhostSucc = (level: number) => new Skill({
    name: 'Ghost SUCC',
    description: 'Succ them ghosts dry.',
    cooldown: new Guage({
        max: 2,
        min: 0,
        value: 0,
    }),
    elements: List.of<Element>(LightElement(level)),
    elementTypes: List.of<ElementType>(ElementType.Light),
})