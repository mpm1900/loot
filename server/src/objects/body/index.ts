
import { ItemRarity, getRarity } from '../../types/item'
import { UncommonBody } from './uncommon'
import { RareBody } from './rare';
import { MasterworkBody } from './masterwork';
import { UniqueBody } from './unique';

export const Body = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonBody(level)
        if (rarity === ItemRarity.Rare) returnValue = RareBody(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkBody(level)
        if (rarity === ItemRarity.Unique) returnValue = UniqueBody(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}