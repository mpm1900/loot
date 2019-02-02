import { Modifier, ModifierType } from '../../types/modifier'
import { iCharacterModifier, WeaponPowerMod } from '../../types/character/character.modifier'
import { List } from 'immutable'

export const WeaponPowerUp = (amount: number, turns = 0) => new Modifier({
    name: 'Weapon Power Up',
    description: `Weapon Power +${amount}`,
    buff: true,
    turns,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(WeaponPowerMod(amount))
});

export const WeaponPowerDown = (amount: number, turns = 0) => new Modifier({
    name: 'Weapon Power Down',
    description: `Weapon Power -${amount}`,
    buff: false,
    turns,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(WeaponPowerMod(amount))
});
