
import { ItemRarity, getRarity, ItemSubType } from '../../types/item'
import { UniqueBody } from './unique'
import { RandomArmor } from '../armor'
import { RandInt } from '../../types/random'

export const Body = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        if (rarity === ItemRarity.Uncommon) returnValue =  RandomArmor(ItemRarity.Uncommon, ItemSubType.Body, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Rare) returnValue = RandomArmor(ItemRarity.Rare, ItemSubType.Body, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Masterwork) returnValue = RandomArmor(ItemRarity.Masterwork, ItemSubType.Body, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Unique) returnValue = UniqueBody(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}