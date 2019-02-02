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


const range = [1, 40]
export const MasterworkCharm = (level) => (Choose(List.of(
    _MasterworkCharm(level)
), 1)).first()

export const _MasterworkCharm = (level) => ( 
    new Item({
        name: 'Masterwork Charm',
        description: 'A masterfully made charm.',
        image: '-- IMAGE URL --',
        level,
        rarity: ItemRarity.Masterwork,
        type: ItemType.Equipable,
        subType: ItemSubType.Charm,
        stats: new ItemStats({
            armor: RandInt(level, level + 75),
        }),
        modifiers: Choose(
            List<Modifier>()
                .concat(RangeFuncChoose(1, 40, ArmorUp, 1))
                .concat(RangeFuncChoose(1, 40, SpeedUp, 1))
                .concat(RangeFuncChoose(1, 40, HealthUp, 1))
                .concat(RangeFuncChoose(1, 40, PoisonResistanceUp, 1))
                .concat(RangeFuncChoose(1, 40, WeaponPowerUp, 1))
                .concat(RangeFuncChoose(1, 40, SpecialUp, 1))
                .concat(RangeFuncChoose(1, 40, StrengthUp, 1)) as List<Modifier>,
            3)
    })
)