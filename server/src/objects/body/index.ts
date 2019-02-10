
import { ItemRarity, getRarity } from '../../types/item'
import { UncommonBody } from './uncommon'
import { RareBody } from './rare';
import { MasterworkBody } from './masterwork';

export const Body = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonHelmet(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonBody(level)
        if (rarity === ItemRarity.Rare) returnValue = RareBody(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkBody(level)
        // if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}