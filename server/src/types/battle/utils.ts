import { Item } from '../item'
import { RandFloat } from '../random'

export const calculateArmorDamage = (rawDamage: number, armor: number) => {
    if (rawDamage > armor) {
        return armor
    } else {
        return rawDamage
    }
}

export const didHit = (weapon: Item) => {
    const accRoll = RandFloat(0, 1)
    return {
        value: accRoll < weapon.stats.accuracy,
        roll: accRoll
    }
}
export const didCrit = (weapon: Item) => {
    const affRoll = RandFloat(0, 1)
    return {
        value: affRoll < weapon.stats.affinity,
        roll: affRoll
    }
}
export const getPower = (weapon: Item): number => {
    let power = 0
    if (!weapon || !weapon.stats) return power
    const crit = didCrit(weapon)
    const hit = didHit(weapon)
    if (!hit.value) {
        console.log('MISSED', weapon.stats.accuracy, hit.roll)
        return power
    }
    power = weapon.stats.power
    if (crit.value) {
        console.log('CRIT', hit.roll)
        power = Math.round(weapon.stats.power * weapon.stats.criticalRatio)
    }
    return power + getElementalDamage(weapon)
}

export const getElementalDamage = (weapon: Item) => {
    let damage = 0
    weapon.elements.forEach(element => {
        // TODO: Check weakness and STAB bonus
        damage += element.power
    })
    console.log('Elemental Damage:', damage)
    return damage
}