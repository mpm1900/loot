import { Modifier, ModifierType } from '../../types/modifier'
import { iCharacterModifier, StrengthMod } from '../../types/character/character.modifier'
import { List } from 'immutable'

export const StrengthUp = (amount: number, turns = 0) => new Modifier({
    name: 'Strength Up',
    description: `Strength +${amount}`,
    buff: true,
    type: ModifierType.Static,
    turns,
    mods: List.of<iCharacterModifier>(StrengthMod(amount))
});

export const StrengthDown = (amount: number, turns = 0) => new Modifier({
    name: 'Strength Down',
    description: `Strength -${amount}`,
    buff: false,
    type: ModifierType.Static,
    turns,
    mods: List.of<iCharacterModifier>(StrengthMod(amount * -1))
});