import { CommonHelmet } from './common/helmet.item';
import { ItemRarity, getRarity } from '../../types/item';
import { UncommonHelmet } from './uncommon/helmet.item';
import { RareHelmet } from './rare/helmet.item';
import { MasterworkHelmet } from './masterwork/helmet.item';


export const Head = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonHelmet(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonHelmet(level)
        if (rarity === ItemRarity.Rare) returnValue = RareHelmet(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkHelmet(level)
        // if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        // if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}