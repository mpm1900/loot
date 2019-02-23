import { List } from 'immutable'
import { ModifierType, Modifier } from '../../types/modifier'
import { iCharacterModifier, ArmorMod } from '../../types/character/character.modifier'

export const ArmorUp = (amount: number) => new Modifier({
    name: 'Armor Up',
    description: `Armor +${amount}`,
    buff: true,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(ArmorMod(amount))
});

export const ArmorDown = (amount: number) => new Modifier({
    name: 'Armor Down',
    description: `Armor -${amount}`,
    buff: false,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(ArmorMod(amount * -1))
});
