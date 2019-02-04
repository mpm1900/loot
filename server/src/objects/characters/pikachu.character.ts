import { RandInt } from '../../types/random'
import { Skill } from '../../types/skill'
import { ElementType, Element, ThunderElement } from '../../types/element'
import { Character } from '../../types/character'
import { List } from 'immutable'
import { Guage } from '../../types/guage'
// import pikaImage from './img/pikachu.character.png'


const LevelRange = (level: number) => RandInt(level / 2, level)

export const Thunderbolt = (level: number) => new Skill({
    name: 'Thunderbolt',
    description: 'Big ol bolt of Thunder',
    cooldown: new Guage({
        max: 3,
        min: 0,
        value: 0,
    }),
    elements: List.of<Element>(ThunderElement(level)),
    elementTypes: List.of<ElementType>(ElementType.Thunder),
})

export const Pikachu = (level = 50) => new Character({
    name: 'Pikachu',
    level: level,
    image: 'https://res.cloudinary.com/dyfavlpyf/image/upload/v1549224020/characters-full/thundermutant.png',
    elementTypes: List.of<ElementType>(ElementType.Light, ElementType.Thunder),
    maxHealth: RandInt(300, 400),
    strength: RandInt(level, level * 3.5),
    special: RandInt(0, level / 2),
    speed: LevelRange(level),
    luck: LevelRange(level),
    memory: LevelRange(level),
    skills: List.of<Skill>(Thunderbolt(level)),
})