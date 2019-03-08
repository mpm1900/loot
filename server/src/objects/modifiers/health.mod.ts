import { Modifier, ModifierType } from '../../types/modifier'
import { Character } from '../../types/character'
import { HealthMod, iCharacterModifier, HealMod, DamageMod, ArmorDamageMod, ElementalDamageMod } from '../../types/character/character.modifier'
import { List } from 'immutable'
import { Element, ElementType } from '../../types/element';

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

export const Damage = (amount: number) => new Modifier({
    name: 'Damage',
    description: `Deal ${amount} Health Damage`,
    buff: amount > 0,
    type: ModifierType.Mutation,
    mods: List.of<iCharacterModifier>(DamageMod(amount))
})

export const ArmorDamage = (amount: number) => new Modifier({
    name: 'Damage with Armor',
    description: `Deal ${amount} Damage with Armor`,
    buff: amount > 0,
    type: ModifierType.Mutation,
    mods: List.of<iCharacterModifier>(ArmorDamageMod(amount))
})

export const ElementalDamage = (elements: List<Element>, targetElements: List<ElementType>) => new Modifier({
    name: 'Elemental Damage',
    description: 'not available',
    buff: true,
    type: ModifierType.Mutation,
    mods: List.of<iCharacterModifier>(ElementalDamageMod(elements, targetElements))
})