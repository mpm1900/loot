import { Trigger, TriggerType } from '../../types/trigger'
import { Modifier } from '../../types/modifier';
import { List } from 'immutable';
import { Heal } from '../modifiers/health.mod';

// Life Steal
export const HealOnHit = (amount: number): Trigger => {
    return new Trigger({
        type: TriggerType.OnHit,
        name: 'Heal On Hit',
        buff: true,
        description: `+${amount} Health`,
        modifiers: List.of<Modifier>(Heal(amount))
    })
}

// "Thorns" Damage
export const DamageOnDamage = (amount: number): Trigger => {
    return new Trigger({
        type: TriggerType.OnDamage,
        name: 'Damage on Damage',
        buff: true,
        description: `Deal ${amount} Damage`,
        targetModifiers: List.of<Modifier>(Heal(amount * -1))
    })
}