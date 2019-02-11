import { Modifier, ModifierType } from '../../types/modifier'
import { iCharacterModifier, SpeedMod } from '../../types/character/character.modifier'
import { List } from 'immutable'

export const SpeedUp = (amount: number) => new Modifier({
    name: 'Speed Up',
    description: `Speed +${amount}`,
    buff: true,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(SpeedMod(amount))
});

export const SpeedDown = (amount: number) => new Modifier({
    name: 'Speed Down',
    description: `Speed -${amount}`,
    buff: false,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(SpeedMod(amount * -1))
});
