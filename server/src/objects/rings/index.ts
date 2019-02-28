import { getRarity, ItemRarity, ItemSubType } from '../../types/item'
import { UniqueRing } from './unique'
import { RandomArmor } from '../armor'
import { RandInt } from '../../types/random'

export const Ring = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  RandomArmor(ItemRarity.Uncommon, ItemSubType.Ring, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Rare) returnValue = RandomArmor(ItemRarity.Rare, ItemSubType.Ring, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Masterwork) returnValue = RandomArmor(ItemRarity.Masterwork, ItemSubType.Ring, level, RandInt(0, 3) === 0)
        if (rarity === ItemRarity.Unique) returnValue = UniqueRing(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}