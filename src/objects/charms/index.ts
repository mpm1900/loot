import { CommonCharm } from "./common";
import { UncommonCharm } from "./uncommon";
import { ItemRarity, getRarity } from "../../types/item";
import { RareCharm } from "./rare";
import { MasterworkCharm } from "./masterwork";
import { UniqueCharm } from "./unique";

export const Charm = (level) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        //if (rarity === ItemRarity.Common) returnValue = CommonCharm(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonCharm(level)
        if (rarity === ItemRarity.Rare) returnValue = RareCharm(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkCharm(level)
        if (rarity === ItemRarity.Unique) returnValue = UniqueCharm(level)
        //if (rarity === ItemRarities.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    // console.log(returnValue)
    return returnValue;
}