import { Character } from '.'

export enum CharacterModifierOperation {
    ADD = 'ADD',
    MULTIPLY = 'MULTIPLY',
    SET = 'SET',
}
export type iCharacterModifierPayload = {
    amount?: number,
    operation?: CharacterModifierOperation,
}
export type iCharacterModifier = {
    type: string,
    payload: iCharacterModifierPayload,
}
export const CharacterModifier = (character: Character, modifier: iCharacterModifier) => {
    switch (modifier.type) {
        case healthModType: return HEALTH_MOD(character, modifier)
        case armorModType: return ARMOR_MOD(character, modifier)
        case strengthModType: return STRENGTH_MOD(character, modifier)
        case specialModType: return SPECIAL_MOD(character, modifier)
        case speedModType: return SPEED_MOD(character, modifier)
        case weaponPowerModType: return WEAPON_POWER_MOD(character, modifier)
        case skillPowerModType: return SKILL_POWER_MOD(character, modifier)
        default: return character
    }
}

const applyOperation = (a: number, b: number, operation: CharacterModifierOperation): number => {
    if (operation === CharacterModifierOperation.ADD) return a + b
    if (operation === CharacterModifierOperation.MULTIPLY) return a * b
    if (operation === CharacterModifierOperation.SET) return b
    return a
}

const healthModType = 'HEALTH_MOD'
export const HealthMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: healthModType,
    payload: { amount, operation }
})
const HEALTH_MOD = (character: Character, modifier: iCharacterModifier): Character => character.setHealth(
    applyOperation(character.maxHealth, modifier.payload.amount, modifier.payload.operation),
    true
)

const armorModType = 'ARMOR_MOD'
export const ArmorMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: armorModType,
    payload: { amount, operation }
})
const ARMOR_MOD = (character: Character, modifier: iCharacterModifier): Character => character.with({
    armor: applyOperation(character.armor, modifier.payload.amount, modifier.payload.operation),
})

// maybe do power, but weapon power seems like the better choice

const strengthModType = 'STRENGTH_MOD'
export const StrengthMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: strengthModType,
    payload: { amount, operation }
})
const STRENGTH_MOD = (character: Character, modifier: iCharacterModifier): Character => character.with({
    strength: applyOperation(character.strength, modifier.payload.amount, modifier.payload.operation),
})

const specialModType = 'SPECIAL_MOD'
export const SpecialMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: specialModType,
    payload: { amount, operation }
})
const SPECIAL_MOD = (character: Character, modifier: iCharacterModifier): Character => character.with({
    special: applyOperation(character.special, modifier.payload.amount, modifier.payload.operation),
})

const speedModType = 'SPEED_MOD'
export const SpeedMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: speedModType,
    payload: { amount, operation }
})
const SPEED_MOD = (character: Character, modifier: iCharacterModifier): Character => character.with({
    speed: applyOperation(character.speed, modifier.payload.amount, modifier.payload.operation)
})

// luck
// memory

const weaponPowerModType = 'WEAPON_POWER_MOD'
export const WeaponPowerMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: weaponPowerModType,
    payload: { amount, operation }
})
const WEAPON_POWER_MOD = (character: Character, modifier: iCharacterModifier): Character => character.weapon ? character.equipWeapon(character.weapon.with({
    stats: character.weapon.stats.with({
        power: applyOperation(character.weapon.stats.power, modifier.payload.amount, modifier.payload.operation)
    })
})) : character

const skillPowerModType = 'SKILL_POWER_MOD'
export const SkillPowerMod = (amount: number, operation: CharacterModifierOperation = CharacterModifierOperation.ADD) => ({
    type: skillPowerModType,
    payload: { amount, operation }
})
const SKILL_POWER_MOD = (character: Character, modifier: iCharacterModifier): Character => character.with({
    skills: character.skills.map(skill => (
        skill.with({
            elements: skill.elements.map(element => element.with({
                power: applyOperation(element.power, modifier.payload.amount, modifier.payload.operation)
            }))
        })
    ))
})