import { ItemRarity, Item, ItemSubType } from '../types/item'

const addRange = (r1: [number, number], r2: [number, number]) => [r1[0] + r2[0], r1[1] + r2[1]]

const baseBody      = [12, 18]
const baseCharm     = [8, 12]
const baseFootwear  = [8, 12]
const baseGloves    = [8, 12]
const baseHead      = [8, 12]
const baseRing      = [8, 12]

const armorRarityOffsets: any = {
    [ItemRarity.Uncommon]:      [4, 10],
    [ItemRarity.Rare]:          [8, 20],
    [ItemRarity.Masterwork]:    [12, 30],
    [ItemRarity.Unique]:        [30, 50],
}

export const getArmorValue = (rarity: ItemRarity, itemSubType: ItemSubType) => {
    switch (itemSubType) {
        case ItemSubType.Body: return addRange(baseBody as [number, number], armorRarityOffsets[rarity] as [number, number])
        case ItemSubType.Charm: return addRange(baseCharm as [number, number], armorRarityOffsets[rarity] as [number, number])
        case ItemSubType.Footwear: return addRange(baseFootwear as [number, number], armorRarityOffsets[rarity] as [number, number])
        case ItemSubType.Gloves: return addRange(baseGloves as [number, number], armorRarityOffsets[rarity] as [number, number])
        case ItemSubType.Head: return addRange(baseHead as [number, number], armorRarityOffsets[rarity] as [number, number])
        case ItemSubType.Ring: return addRange(baseRing as [number, number], armorRarityOffsets[rarity] as [number, number])
    }
}