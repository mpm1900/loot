import { RandInt } from '../../types/random'
import { Skill } from '../../types/skill'
import { ElementType } from '../../types/element'
import { Character } from '../../types/character'
import { List } from 'immutable'
import { FLOODSpray, FireBall, StarPower, GhostSucc } from '../skills'
// import marioImage from './img/mario.character.png'
// import animeTiddies from './img/wtf.png'


const LevelRange = (level: number) => RandInt(level / 2, level)

export const Mario = (level = 50) => new Character({
    name: 'Mario, Destroyer of Worlds',
    level: level,
    // image: marioImage,
    elementTypes: List.of(ElementType.Fire, ElementType.Dragon),
    maxHealth: RandInt(300, 400),
    strength: LevelRange(level),
    special: LevelRange(level),
    speed: LevelRange(level),
    luck: LevelRange(level),
    memory: LevelRange(level),
    skills: List.of<Skill>(StarPower(level), FLOODSpray(level), FireBall(level)),
})

export const AnimeLady = (level = 50) => new Character({
    name: 'Big Tiddie Anime Lady',
    level: level,
    // image: animeTiddies,
    elementTypes: List.of(ElementType.Light, ElementType.Dark, ElementType.Water),
    maxHealth: RandInt(300, 400),
    strength: LevelRange(level),
    special: LevelRange(level),
    speed: LevelRange(level),
    luck: LevelRange(level),
    memory: LevelRange(level),
    skills: List.of<Skill>(StarPower(level), GhostSucc(level)),
})