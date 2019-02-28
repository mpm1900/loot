import { ItemRarity, getRarity, ItemSubType } from '../../types/item'
import { UniqueHelmet } from './unique'
import { RandomArmor } from '../armor'
import { RandInt } from '../../types/random'

export const Head = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonHelmet(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  RandomArmor(ItemRarity.Uncommon, ItemSubType.Head, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Rare) returnValue = RandomArmor(ItemRarity.Rare, ItemSubType.Head, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Masterwork) returnValue = RandomArmor(ItemRarity.Masterwork, ItemSubType.Head, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Unique) returnValue = UniqueHelmet(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}