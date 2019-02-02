import { getRarity, ItemRarity } from "../../types/item";
import { UncommonGloves } from "./uncommon";


export const Gloves = (level) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        //if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonGloves(level)
        //if (rarity === ItemRarity.Rare) returnValue = RareRing(level)
        //if (rarity === ItemRarity.Masterwork) returnValue = MasterworkRing(level)
        //if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        //if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}