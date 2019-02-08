import { Modifier, ModifierType } from '../../types/modifier'
import { Character } from '../../types/character'
import { HealthMod, iCharacterModifier, HealMod } from '../../types/character/character.modifier'
import { List } from 'immutable'

export const HealthUp = (amount: number) => {
    return new Modifier({
        name: 'Health Up',
        description: `Health +${amount}`,
        buff: true,
        type: ModifierType.Static,
        mods: List.of<iCharacterModifier>(HealthMod(amount))
    });
}

export const HealthDown = (amount: number) => new Modifier({
    name: 'Health Down',
    description: `Health -${amount}`,
    buff: false,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(HealthMod(amount * -1))
});

export const Heal = (amount: number) => new Modifier({
    name: 'Heal',
    description: `Heal ${amount}`,
    buff: amount > 0,
    type: ModifierType.Mutation,
    mods: List.of<iCharacterModifier>(HealMod(amount))
})