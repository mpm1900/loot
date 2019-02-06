import { RandInt } from '../../types/random'
import { Skill } from '../../types/skill'
import { ElementType } from '../../types/element'
import { Character } from '../../types/character'
import { List } from 'immutable'
import { FLOODSpray, FireBall, StarPower } from '../skills'
// import pontiffImage from './img/pontif.character.jpg'


const LevelRange = (level: number) => RandInt(level / 2, level)
const health = RandInt(300, 400)
export const PontiffSulyvahn = (level = 50) => {
    return new Character({
        name: 'Pontiff Sulyvahn',
        level: level,
        // image: pontiffImage,
        elementTypes: List.of(ElementType.Dark, ElementType.Fire),
        maxHealth: health,
        health,
        strength: LevelRange(level),
        special: LevelRange(level),
        speed: LevelRange(level),
        luck: LevelRange(level),
        memory: LevelRange(level),
        skills: List.of<Skill>(StarPower(level), FLOODSpray(level), FireBall(level)),
    })
}