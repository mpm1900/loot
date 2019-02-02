import { Choose, RangeFunc, RangeFuncChoose, RandInt } from "../../../types/random";
import { List } from "immutable";
import { Item, ItemRarity, ItemType, ItemSubType } from "../../../types/item";
import { ArmorUp } from "../../modifiers/armor.mod";
import { SpeedUp } from "../../modifiers/speed.mod";
import { HealthUp } from "../../modifiers/health.mod";
import { PoisonResistanceUp } from "../../modifiers/status.mod";
import { WeaponPowerUp } from "../../modifiers/weapon.mod";
import { StrengthUp } from "../../modifiers/strength.mod";
import { Modifier } from "../../../types/modifier";
import { ItemStats } from "../../../types/item/item.stats";

export const CommonHelmet = (level) => (Choose(List.of(
    BrokenHelmet(level)
), 1)).first()


export const BrokenHelmet = (level) => new Item({
    name: 'Broken Helment',
    description: 'A war-torn helmet of former glory.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Head,
    rarity: ItemRarity.Common,
    stats: new ItemStats({
        armor: RandInt(level - 10, level + 10),
    })
})