import { Modifier, ModifierType } from "../../types/modifier";
import { Character } from "../../types/character";
import { HealthMod, iCharacterModifier } from "../../types/character/character.modifier";
import { List } from "immutable";

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
