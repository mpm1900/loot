import { Modifier, ModifierType } from "../../types/modifier";
import { Character } from "../../types/character";


export const DamageBuff = (amount: number) => new Modifier({
    name: 'Damage Buff',
    description: `${100 * amount}% damage`,
    buff: amount > 1,
    type: ModifierType.Mutation,
});
export const DefenseBuff = (amount: number) => new Modifier({
    name: 'Defense Buff',
    description: `${100 / amount}% damage taken`,
    buff: amount > 1,
    type: ModifierType.Mutation,
})
export const DamageDefenseBuff = (amount: number) => {
    const _damage = DamageBuff(amount)
    const _defense = DefenseBuff(amount)
    let _this = _damage

    _this = _this.with({
        ..._this,
        name: 'Damage + Defense Buff',
        description: `${_damage.description}, ${_defense.description}`
        // TODO: Add more later
    })
    return _this
}