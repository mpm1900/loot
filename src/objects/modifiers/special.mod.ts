import { Modifier, ModifierType } from "../../types/modifier";
import { Character } from "../../types/character";
import { iCharacterModifier, SpecialMod } from "../../types/character/character.modifier";
import { List } from "immutable";

export const SpecialUp = (amount: number, turns = 0) => new Modifier({
    name: 'Special Up',
    description: `Special +${amount}`,
    buff: true,
    type: ModifierType.Static,
    turns,
    mods: List.of<iCharacterModifier>(SpecialMod(amount))
});

export const SpecialDown = (amount: number, turns = 0) => new Modifier({
    name: 'Special Down',
    description: `Special -${amount}`,
    buff: false,
    type: ModifierType.Static,
    turns,
    mods: List.of<iCharacterModifier>(SpecialMod(amount * -1))
});
