import { Item } from '../item'
import { RandFloat } from '../random'
import { Element, ElementType, ElementsTable } from '../element';
import { List } from 'immutable';

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
    if (weapon && weapon.stats) {
        const crit = didCrit(weapon)
        const hit = didHit(weapon)
        if (hit.value) {
            power = weapon.stats.power
            if (crit.value) {
                console.log('CRIT', hit.roll)
                power = Math.round(power * weapon.stats.criticalRatio)
            }
            console.log('WEAPON POWER', power)
        }
        else {
            console.log('MISSED', weapon.stats.accuracy, hit.roll)
        }
    }
    return power
}

export const getElementalMultiplier = (type: ElementType, list: List<ElementType>) => {
    return list.reduce((multiplier: number, t: ElementType) => (
        multiplier * ElementsTable[type][t]
    ), 1)
}

export const getElementalDamage = (elements: List<Element>, targetElements: List<ElementType>) => {
    let damage = 0
    elements.forEach(element => {
        // TODO: Check STAB bonus
        damage += element.power * getElementalMultiplier(element.type, targetElements)
    })
    console.log('Elemental Damage:', damage)
    return damage
}