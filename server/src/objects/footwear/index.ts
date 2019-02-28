import { getRarity, ItemRarity, ItemSubType } from '../../types/item'
import { RandomArmor } from '../armor'
import { RandInt } from '../../types/random'

export const Footwear = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  RandomArmor(ItemRarity.Uncommon, ItemSubType.Footwear, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Rare) returnValue = RandomArmor(ItemRarity.Rare, ItemSubType.Footwear, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Masterwork) returnValue = RandomArmor(ItemRarity.Masterwork, ItemSubType.Footwear, level, RandInt(0, 3) === 0)
        // if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    return returnValue;
}