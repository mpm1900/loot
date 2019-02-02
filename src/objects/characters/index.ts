import { Character } from '../../types/character'
import { Choose } from '../../types/random'
import { List } from 'immutable'
import { Mario, AnimeLady } from './mario.character';
import { Shrek } from './shrek.character';
import { DonaldDuck } from './duck.character';
import { Pikachu } from './pikachu.character';

export const CharacterFactory = (level: number): Character => {
    return Choose(
        List.of<Character>(Mario(100), Shrek(100), DonaldDuck(100), Pikachu(100), AnimeLady(100)),
        1
    ).first()
}