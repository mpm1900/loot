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


export const UncommonRing = (level) => (Choose(List.of(
    SilverRing(level),
    StrengthRing(level),
), 1)).first()

export const SilverRing = (level) => new Item({
    name: 'Silver Ring',
    description: 'A strange, silver ring.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Uncommon,
    stats: new ItemStats({
        armor: RandInt(level, level + 30),
    }),
    modifiers: Choose(List.of<Modifier>(
        ArmorUp(RandInt(1, 20)),
        SpeedUp(RandInt(1, 20)),
        HealthUp(RandInt(1, 20)),
        StrengthUp(RandInt(1, 20)),
        WeaponPowerUp(RandInt(1, 20)),
        PoisonResistanceUp(RandInt(1, 20)),
    ), 1)
})

export const StrengthRing = (level) => new Item({
    name: 'Strength Ring',
    description: 'A silver ring, that gives you strength.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Uncommon,
    stats: new ItemStats({
        armor: RandInt(level, level + 20),
    }),
    modifiers: Choose(List.of<Modifier>(
        StrengthUp(RandInt(1, 15)),
    ), 1)
})