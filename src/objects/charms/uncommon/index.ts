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
import { SpecialUp } from "../../modifiers/special.mod";

const range = [1, 20]

export const UncommonCharm = (level) => (Choose(List([
    _UncommonCharm(level),
    BrokenCharm(level)
]), 1)).first()

export const _UncommonCharm = (level) => new Item({
    name: 'Uncommon Charm',
    description: 'Just a less basic charm',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Charm,
    rarity: ItemRarity.Uncommon,
    stats: new ItemStats({
        armor: RandInt(level, level + 30),
    }),
    modifiers: List<Modifier>()
        .merge(
            Choose(List<Modifier>()
                .concat(RangeFuncChoose(1, 20, ArmorUp, 1))
                .concat(RangeFuncChoose(1, 20, SpeedUp, 1))
                .concat(RangeFuncChoose(1, 20, HealthUp, 1))
                .concat(RangeFuncChoose(1, 20, StrengthUp, 1))
                .concat(RangeFuncChoose(1, 20, SpecialUp, 1)),
            1)
        )
})

export const BrokenCharm = (level) => new Item({
    name: 'Broken Charm',
    description: 'A broken, once magical charm.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Charm,
    rarity: ItemRarity.Uncommon,
    stats: new ItemStats({
        armor: RandInt(level, level + 50),
    }),
    modifiers: List<Modifier>()
        .merge(
            Choose(List<Modifier>()
                .concat(RangeFuncChoose(1, 20, ArmorUp, 1))
                .concat(RangeFuncChoose(1, 20, SpeedUp, 1))
                .concat(RangeFuncChoose(1, 20, HealthUp, 1))
                .concat(RangeFuncChoose(1, 20, StrengthUp, 1))
                .concat(RangeFuncChoose(1, 20, SpecialUp, 1)),
            1)
        )
})