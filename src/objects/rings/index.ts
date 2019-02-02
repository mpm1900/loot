import { getRarity, ItemRarity } from "../../types/item";
import { UncommonRing } from "./uncommon";
import { RareRing } from "./rare";
import { MasterworkRing } from "./masterwork";

export const Ring = (level) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        //if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonRing(level)
        if (rarity === ItemRarity.Rare) returnValue = RareRing(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkRing(level)
        //if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        //if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}