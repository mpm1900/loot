import { ItemRarity, ItemSubType, ItemWeaponType } from '../types/item'
import { iItemStats } from '../types/item/item.stats'
import { RandInt } from '../types/random'
import { RandFloat } from '../types/random'

const addRange = (
    r1: [number, number],
    r2: [number, number]
): [number, number] => [(r1[0] + r2[0]), (r1[1] + r2[1])]

const baseBody: [number, number]      = [12, 18]
const baseCharm: [number, number]     = [8, 12]
const baseFootwear: [number, number]  = [8, 12]
const baseGloves: [number, number]    = [8, 12]
const baseHead: [number, number]      = [8, 12]
const baseRing: [number, number]      = [8, 12]

const armorRarityOffsets: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [4, 10],
        [ItemSubType.Ring]:     [4, 10],
        [ItemSubType.Head]:     [4, 10],
        [ItemSubType.Body]:     [4, 10],
        [ItemSubType.Footwear]: [4, 10],
        [ItemSubType.Gloves]:   [4, 10],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [8, 20],
        [ItemSubType.Ring]:     [8, 20],
        [ItemSubType.Head]:     [8, 20],
        [ItemSubType.Body]:     [8, 20],
        [ItemSubType.Footwear]: [8, 20],
        [ItemSubType.Gloves]:   [8, 20],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [12, 30],
        [ItemSubType.Ring]:     [12, 30],
        [ItemSubType.Head]:     [12, 30],
        [ItemSubType.Body]:     [12, 30],
        [ItemSubType.Footwear]: [12, 30],
        [ItemSubType.Gloves]:   [12, 30],
    },
    // unique items are allowed to break this rule
    [ItemRarity.Unique]: {
        [ItemSubType.Charm]:    [30, 50],
        [ItemSubType.Ring]:     [30, 50],
        [ItemSubType.Head]:     [30, 50],
        [ItemSubType.Body]:     [30, 50],
        [ItemSubType.Footwear]: [30, 50],
        [ItemSubType.Gloves]:   [30, 50],
    },
}

const baseGreatswordPower: [number, number]    = [150, 250]
const baseLongswordPower: [number, number]     = [50, 100]
const baseDaggerPower: [number, number]        = [20, 40]
const weaponPowerRarityOffsets: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [10, 10],
        [ItemWeaponType.Longsword]:     [10, 10],
        [ItemWeaponType.Dagger]:        [8, 20],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [25, 35],
        [ItemWeaponType.Longsword]:     [25, 35],
        [ItemWeaponType.Dagger]:        [20, 50],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [50, 60],
        [ItemWeaponType.Longsword]:     [50, 60],
        [ItemWeaponType.Dagger]:        [30, 100],
    },
    // unique items are allowed to break this rule
    [ItemRarity.Unique]: {
        [ItemWeaponType.Greatsword]:    [100, 110],
        [ItemWeaponType.Longsword]:     [100, 110],
        [ItemWeaponType.Dagger]:        [50, 200],
    }
}

const baseGreatswordAccuracy: [number, number]  = [0.55, 0.75]
const baseLongswordAccuracy: [number, number]   = [0.80, 0.95]
const baseDaggerAccuracy: [number, number]      = [0.80, 0.95]
const weaponAccuracyRarityOffsets: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [0, 0],
        [ItemWeaponType.Longsword]:     [0, 0],
        [ItemWeaponType.Dagger]:        [0, 0],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [0, 0],
        [ItemWeaponType.Longsword]:     [0, 0],
        [ItemWeaponType.Dagger]:        [0, 0],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [0.05, 0.05],
        [ItemWeaponType.Longsword]:     [0.05, 0.05],
        [ItemWeaponType.Dagger]:        [0.05, 0.05],
    },
    // unique items are allowed to break this rule
    [ItemRarity.Unique]: {
        [ItemWeaponType.Greatsword]:    [0.05, 0.05],
        [ItemWeaponType.Longsword]:     [0.05, 0.05],
        [ItemWeaponType.Dagger]:        [0.05, 0.05],
    },
}

const baseGreatswordAffinity: [number, number]  = [0.00, 0.30]
const baseLongswordAffinity: [number, number]   = [0.00, 0.35]
const baseDaggerAffinity: [number, number]      = [0.15, 0.40]
const weaponAffinityRarityOffsets: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [0, 0],
        [ItemWeaponType.Longsword]:     [0, 0],
        [ItemWeaponType.Dagger]:        [0, 0.05],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [0, 0],
        [ItemWeaponType.Longsword]:     [0, 0],
        [ItemWeaponType.Dagger]:        [0, 0.10],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [0.05, 0.05],
        [ItemWeaponType.Longsword]:     [0.05, 0.05],
        [ItemWeaponType.Dagger]:        [0.05, 0.20],
    },
    // unique items are allowed to break this rule
    [ItemRarity.Unique]: {
        [ItemWeaponType.Greatsword]:    [0.05, 0.05],
        [ItemWeaponType.Longsword]:     [0.15, 0.05],
        [ItemWeaponType.Dagger]:        [0.15, 0.30],
    },
}

const baseGreatswordCriticalRatio: [number, number] = [1.00, 2.50]
const baseLongswordCriticalRatio: [number, number]  = [1.00, 2.00]
const baseDaggerCriticalRatio: [number, number]     = [1.50, 2.75]
const weaponCriticalRatioRarityOffsets: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [0, 0],
        [ItemWeaponType.Longsword]:     [0, 0],
        [ItemWeaponType.Dagger]:        [0, 0],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [0, 0],
        [ItemWeaponType.Longsword]:     [0, 0],
        [ItemWeaponType.Dagger]:        [0, 0],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [0.05, 0.50],
        [ItemWeaponType.Longsword]:     [0.05, 0.05],
        [ItemWeaponType.Dagger]:        [0.05, 0.50],
    },
    // unique items are allowed to break this rule
    [ItemRarity.Unique]: {
        [ItemWeaponType.Greatsword]:    [0.05, 0.50],
        [ItemWeaponType.Longsword]:     [0.05, 0.05],
        [ItemWeaponType.Dagger]:        [0.05, 0.75],
    },
}

export const getArmorValue = (rarity: ItemRarity, itemSubType: ItemSubType): [number, number] => {
    const offset = armorRarityOffsets[rarity][itemSubType]
    switch (itemSubType) {
        case ItemSubType.Body: return addRange(baseBody, offset)
        case ItemSubType.Charm: return addRange(baseCharm, offset)
        case ItemSubType.Footwear: return addRange(baseFootwear, offset)
        case ItemSubType.Gloves: return addRange(baseGloves, offset)
        case ItemSubType.Head: return addRange(baseHead, offset)
        case ItemSubType.Ring: return addRange(baseRing, offset)
        default: return [0, 0]
    }
}

export const getWeaponPower = (rarity: ItemRarity, itemWeaponType: ItemWeaponType): [number, number] => {
    const offset = weaponPowerRarityOffsets[rarity][itemWeaponType]
    switch (itemWeaponType) {
        case ItemWeaponType.Greatsword: return addRange(baseGreatswordPower, offset)
        case ItemWeaponType.Longsword: return addRange(baseLongswordPower, offset)
        case ItemWeaponType.Dagger: return addRange(baseDaggerPower, offset)
        default: return [0, 0]
    }
}

export const getWeaponAccuracy = (rarity: ItemRarity, itemWeaponType: ItemWeaponType): [number, number] => {
    const offset = weaponAccuracyRarityOffsets[rarity][itemWeaponType]
    switch (itemWeaponType) {
        case ItemWeaponType.Greatsword: return addRange(baseGreatswordAccuracy, offset)
        case ItemWeaponType.Longsword: return addRange(baseLongswordAccuracy, offset)
        case ItemWeaponType.Dagger: return addRange(baseDaggerAccuracy, offset)
        default: return [0, 0]
    }
}

export const getWeaponAffinity = (rarity: ItemRarity, itemWeaponType: ItemWeaponType): [number, number] => {
    const offset = weaponAffinityRarityOffsets[rarity][itemWeaponType]
    switch (itemWeaponType) {
        case ItemWeaponType.Greatsword: return addRange(baseGreatswordAffinity, offset)
        case ItemWeaponType.Longsword: return addRange(baseLongswordAffinity, offset)
        case ItemWeaponType.Dagger: return addRange(baseDaggerAffinity, offset)
        default: return [0, 0]
    }
}

export const getWeaponCriticalRatio = (rarity: ItemRarity, itemWeaponType: ItemWeaponType): [number, number] => {
    const offset = weaponCriticalRatioRarityOffsets[rarity][itemWeaponType]
    switch (itemWeaponType) {
        case ItemWeaponType.Greatsword: return addRange(baseGreatswordCriticalRatio, offset)
        case ItemWeaponType.Longsword: return addRange(baseLongswordCriticalRatio, offset)
        case ItemWeaponType.Dagger: return addRange(baseDaggerCriticalRatio, offset)
        default: return [0, 0]
    }
}

export const getWeaponStats = (rarity: ItemRarity, weaponType: ItemWeaponType): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(rarity, weaponType)
    const accuracyRange: [number, number] = getWeaponAccuracy(rarity, weaponType)
    const affinityRange: [number, number] = getWeaponAffinity(rarity, weaponType)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(rarity, weaponType)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const getArmorStats = (rarity: ItemRarity, subType: ItemSubType): iItemStats => {
    const armorRange = getArmorValue(rarity, subType) as [number, number]
    return {
        armor: RandInt(...armorRange),
    }
}