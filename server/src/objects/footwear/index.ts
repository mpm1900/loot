import { getRarity, ItemRarity } from '../../types/item'
import { UncommonFootwear } from './uncommon'
import { RareFootware } from './rare';
import { MasterworkFootware } from './masterwork';


export const Footwear = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonFootwear(level)
        if (rarity === ItemRarity.Rare) returnValue = RareFootware(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkFootware(level)
        // if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    return returnValue;
}