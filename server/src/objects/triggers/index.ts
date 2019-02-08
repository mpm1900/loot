import { Trigger, TriggerType } from '../../types/trigger'
import { Modifier } from '../../types/modifier';
import { List } from 'immutable';
import { Heal } from '../modifiers/health.mod';

// Life Steal
export const HealOnHit = (amount: number): Trigger => {
    return new Trigger({
        type: TriggerType.OnHit,
        name: 'Heal On Hit',
        description: `Heal ${amount} on hit.`,
        modifiers: List.of<Modifier>(Heal(amount))
    })
}

// "Thorns" Damage
export const DamageOnDamage = (amount: number): Trigger => {
    return new Trigger({
        type: TriggerType.OnDamage,
        name: 'Damage on Damage',
        description: `Deal ${amount} damage when damaged.`,
        targetModifiers: List.of<Modifier>(Heal(amount * -1))
    })
}