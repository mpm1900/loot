import { Modifier, ModifierType } from '../../types/modifier'
import { iCharacterModifier, SkillPowerMod, CharacterModifierOperation } from '../../types/character/character.modifier'
import { List } from 'immutable'

export const SkillPowerUp = (amount: number, turns = 0, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => new Modifier({
    name: 'Skill Power Up',
    description: `Skill Power +${amount}`,
    buff: true,
    turns,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(SkillPowerMod(amount, operation))
});

export const SkillPowerDown = (amount: number, turns = 0, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => new Modifier({
    name: 'Skill Power Down',
    description: `Skill Power -${amount}`,
    buff: false,
    turns,
    type: ModifierType.Static,
    mods: List.of<iCharacterModifier>(SkillPowerMod(amount, operation))
});
