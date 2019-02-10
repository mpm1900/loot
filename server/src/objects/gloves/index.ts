import { getRarity, ItemRarity } from '../../types/item'
import { UncommonGloves } from './uncommon'
import { RareGloves } from './rare';
import { MasterworkGloves } from './masterwork';


export const Gloves = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonGloves(level)
        if (rarity === ItemRarity.Rare) returnValue = RareGloves(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkGloves(level)
        // if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}