import { Modifier, ModifierType } from '../../types/modifier'
import { Character } from '../../types/character'
import { Guage } from '../../types/guage'

export const PoisonResistanceDown = (amount: number) => new Modifier({
    name: 'Poison Resistance Down',
    description: `Poison Resistance -${amount}`,
    buff: false,
    type: ModifierType.Static,
});

export const PoisonResistanceUp = (amount: number) => new Modifier({
    name: 'Poison Resistance Up',
    description: `Poison Resistance +${amount}`,
    buff: true,
    type: ModifierType.Static,
});
