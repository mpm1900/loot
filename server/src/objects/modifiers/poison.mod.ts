import { Modifier, ModifierType } from "../../types/modifier";
import { Character } from "../../types/character";

const POISON_DAMAGE = 50

export const Poisoned = () => new Modifier({
    name: 'Poisoned',
    description: `Lose 5 health each turn.`,
    buff: false,
    type: ModifierType.Status,
})