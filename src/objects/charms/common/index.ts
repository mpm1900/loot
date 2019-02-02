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

export const CommonCharm = (level) => (Choose(List.of(
    BasicCharm(level),
    BrokenCharm(level)
), 1)).first()

export const BasicCharm = (level) => new Item({
    name: 'Basic Charm',
    description: 'Just a really basic charm',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Charm,
    rarity: ItemRarity.Common,
    stats: new ItemStats({
        armor: RandInt(1, level),
    })
})

export const BrokenCharm = (level) => new Item({
    name: 'Broken Charm',
    description: 'A broken, once magical charm.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Charm,
    rarity: ItemRarity.Common,
    stats: new ItemStats({
        armor: RandInt(level - 10, level + 10),
    })
})