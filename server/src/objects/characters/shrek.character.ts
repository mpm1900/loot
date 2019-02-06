import { RandInt } from '../../types/random'
import { Skill } from '../../types/skill'
import { ElementType } from '../../types/element'
import { Character } from '../../types/character'
import { List } from 'immutable'
import { Modifier } from '../../types/modifier'
import { StrengthUp } from '../modifiers/strength.mod'
import { Guage } from '../../types/guage'
// import shrekImage from './img/shrek.character.png'


const LevelRange = (level: number) => RandInt(level / 2, level)
export const OgresRage = (level: number) => new Skill({
    name: 'Ogre\'s Rage',
    description: 'Increased Strength',
    cooldown: new Guage({
        max: 2,
        min: 0,
        value: 0,
    }),
    modifiers: List.of<Modifier>(StrengthUp(level)),
    elementTypes: List.of<ElementType>(ElementType.Grass),
})

export const Shrek = (level = 50) => {
    const health = RandInt(300, 400)
    return new Character({
        name: 'Shrek, Ogre of the Swamp',
        level: level,
        image: 'https://res.cloudinary.com/dyfavlpyf/image/upload/v1549224020/characters-full/thundermutant.png',
        elementTypes: List.of(ElementType.Dragon, ElementType.Thunder),
        maxHealth: health,
        health,
        strength: RandInt(level, level * 3.5),
        special: RandInt(0, level / 2),
        speed: LevelRange(level),
        luck: LevelRange(level),
        memory: LevelRange(level),
        skills: List.of<Skill>(OgresRage(level)),
    })
}