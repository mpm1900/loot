import { Character } from '../../types/character'
import { Choose } from '../../types/random'
import { List } from 'immutable'
import { Mario, AnimeLady } from './mario.character';
import { Shrek } from './shrek.character';
import { DonaldDuck } from './duck.character';
import { Pikachu } from './pikachu.character';

export const RandomCharacterFactory = (level: number): Character => {
    return Choose(
        AllCharacters.map(cf => cf(level)),
        1
    ).first()
}

export const AllCharacters = List.of<Function>(Mario, Shrek, DonaldDuck, Pikachu, AnimeLady)