import { ItemRarity, Item, ItemSubType, ItemWeaponType } from '../types/item'

const addRange = (r1: [number, number], r2: [number, number]): [number, number] => [r1[0] + r2[0], r1[1] + r2[1]]

const baseBody: [number, number]      = [12, 18]
const baseCharm: [number, number]     = [8, 12]
const baseFootwear: [number, number]  = [8, 12]
const baseGloves: [number, number]    = [8, 12]
const baseHead: [number, number]      = [8, 12]
const baseRing: [number, number]      = [8, 12]

const armorRarityOffsets: any = {
    [ItemRarity.Uncommon]:      [4, 10],
    [ItemRarity.Rare]:          [8, 20],
    [ItemRarity.Masterwork]:    [12, 30],
    // unique items are allowed to break this rule
    [ItemRarity.Unique]:        [30, 50],
}

const baseGreatswordPower: [number, number]    = [150, 250]
const baseLongswordPower: [number, number]     = [50, 100]

const weaponPowerRarityOffsets: any = {
       [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [10, 10],
        [ItemWeaponType.Longsword]:     [10, 10],
    }, [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [25, 35],
        [ItemWeaponType.Longsword]:     [25, 35],
    }, [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [50, 60],
        [ItemWeaponType.Longsword]:     [50, 60],
    }, [ItemRarity.Unique]: {
        [ItemWeaponType.Greatsword]:    [100, 110],
        [ItemWeaponType.Longsword]:     [100, 110],
    }
}

export const getArmorValue = (rarity: ItemRarity, itemSubType: ItemSubType): [number, number] => {
    const offset = armorRarityOffsets[rarity]
    switch (itemSubType) {
        case ItemSubType.Body: return addRange(baseBody, offset)
        case ItemSubType.Charm: return addRange(baseCharm, offset)
        case ItemSubType.Footwear: return addRange(baseFootwear, offset)
        case ItemSubType.Gloves: return addRange(baseGloves, offset)
        case ItemSubType.Head: return addRange(baseHead, offset)
        case ItemSubType.Ring: return addRange(baseRing, offset)
    }
}

export const getWeaponPower = (rarity: ItemRarity, itemWeaponType: ItemWeaponType) => {
    const offset = weaponPowerRarityOffsets[rarity][itemWeaponType]
    switch (itemWeaponType) {
        case ItemWeaponType.Greatsword: return addRange(baseGreatswordPower, offset)
        case ItemWeaponType.Longsword: return addRange(baseLongswordPower, offset)
    }
}
