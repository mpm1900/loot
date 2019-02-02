import { RandInt } from '../../types/random';
import { Skill } from '../../types/skill';
import { ElementType, Element, WaterElement } from '../../types/element';
import { Character } from '../../types/character';
import { Modifier } from '../../types/modifier';
import { List } from 'immutable';
import { Guage } from '../../types/guage';
import { FLOODSpray } from '../skills';
// import duckImage from './img/duck.character.png'


const LevelRange = (level: number) => RandInt(level / 2, level)

export const HydroPump = (level: number) => new Skill({
    name: 'MF\'ing HYDRO PUMP',
    description: `Deal ${level} ${ElementType.Water}`,
    cooldown: new Guage({
        max: 5,
        min: 0,
        value: 0,
    }),
    elements: List.of<Element>(WaterElement(level)),
    elementTypes: List.of<ElementType>(ElementType.Grass),
})

export const DonaldDuck = (level = 50) => new Character({
    name: 'Donald \'Shoot yo Ass\' Duck',
    level: level,
    // image: duckImage,
    elementTypes: List.of<ElementType>(ElementType.Dragon, ElementType.Water),
    maxHealth: RandInt(300, 400),
    strength: RandInt(level, level * 3.5),
    special: RandInt(0, level / 2),
    speed: LevelRange(level),
    luck: LevelRange(level),
    memory: LevelRange(level),
    skills: List.of<Skill>(FLOODSpray(level), HydroPump(level)),
})