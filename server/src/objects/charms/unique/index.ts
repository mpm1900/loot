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

const range = [20, 50]

export const UniqueCharm = (level) => (Choose(List.of(
    _UniqueCharm(level)
), 1)).first()

export const _UniqueCharm = (level) => ( 
    new Item({
        name: 'The Sorcerers Stone',
        description: 'Go to Hogwarts you ding-bag.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Charm,
        rarity: ItemRarity.Unique,
        stats: new ItemStats({
            armor: RandInt(level, level + 100),
        }),
        modifiers: Choose(
            List<Modifier>()
                .concat(RangeFuncChoose(20, 50, ArmorUp, 1))
                .concat(RangeFuncChoose(20, 50, SpeedUp, 1))
                .concat(RangeFuncChoose(20, 50, HealthUp, 1))
                .concat(RangeFuncChoose(20, 50, PoisonResistanceUp, 1))
                .concat(RangeFuncChoose(20, 50, SpecialUp, 1))
                .concat(RangeFuncChoose(20, 50, StrengthUp, 1)) as List<Modifier>,
            4)
    })
)