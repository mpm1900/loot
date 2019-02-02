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

export const RareCharm = (level) => (Choose(List.of(
    _RareCharm(level)
), 1)).first()

export const _RareCharm = (level) => ( 
    new Item({
        name: 'Rare Charm',
        description: 'A rare charm.',
        image: '-- IMAGE URL --',
        level,
        rarity: ItemRarity.Rare,
        type: ItemType.Equipable,
        subType: ItemSubType.Charm,
        stats: new ItemStats({
            armor: RandInt(level, level + 60),
        }),
        modifiers: Choose(
            List<Modifier>()
                .concat(RangeFuncChoose(1, 20, ArmorUp, 1))
                .concat(RangeFuncChoose(1, 20, SpeedUp, 1))
                .concat(RangeFuncChoose(1, 20, HealthUp, 1))
                .concat(RangeFuncChoose(1, 20, PoisonResistanceUp, 1))
                .concat(RangeFuncChoose(1, 20, SpecialUp, 1))
                .concat(RangeFuncChoose(1, 20, StrengthUp, 1)) as List<Modifier>,
            2)
    })
)