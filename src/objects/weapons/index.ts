
import { CommonWeapon } from "./common";
import { UncommonWeapon } from "./uncommon";
import { RareWeapon } from "./rare";
import { MasterworkWeapon } from "./masterwork";
import { UniqueWeapon } from "./unique";
import { BlackMarketWeapon } from "./blackmarket";
import { ItemRarity, getRarity } from "../../types/item";


export const Weapon = (level) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        // if (rarity === ItemRarity.Common) returnValue = CommonWeapon(level)
        if (rarity === ItemRarity.Uncommon) returnValue =  UncommonWeapon(level)
        if (rarity === ItemRarity.Rare) returnValue = RareWeapon(level)
        if (rarity === ItemRarity.Masterwork) returnValue = MasterworkWeapon(level)
        if (rarity === ItemRarity.Unique) returnValue = UniqueWeapon(level)
        if (rarity === ItemRarity.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    return returnValue;
}

