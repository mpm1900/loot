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

export const UncommonBody = (level) => (Choose(List.of(
    LeatherArmor(level)
), 1)).first()


export const LeatherArmor = (level) => new Item({
    name: 'Leather Armor',
    description: 'Just some basic leather armor.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Body,
    rarity: ItemRarity.Uncommon,
    stats: new ItemStats({
        armor: RandInt(level, level + 30),
    }),
    modifiers: List<Modifier>()
        .merge(
            Choose(List.of<Modifier>(
                ArmorUp(RandInt(1, 20)),
                SpeedUp(RandInt(1, 20)),
                HealthUp(RandInt(1, 20)),
                StrengthUp(RandInt(1, 20))),
            1)
        )
})