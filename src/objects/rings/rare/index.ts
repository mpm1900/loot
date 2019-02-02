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


export const RareRing = (level) => (Choose(List.of(
    GoldRing(level),
    StrengthRing(level),
    SpeedRing(level),
), 1)).first()

export const GoldRing = (level) => new Item({
    name: 'Silver Ring',
    description: 'A strange, sold ring.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Rare,
    stats: new ItemStats({
        armor: RandInt(level, level + 50),
    }),
    modifiers: Choose(List.of<Modifier>(
        ArmorUp(RandInt(1, 20)),
        SpeedUp(RandInt(1, 20)),
        HealthUp(RandInt(1, 20)),
        StrengthUp(RandInt(1, 20)),
        WeaponPowerUp(RandInt(1, 20)),
        PoisonResistanceUp(RandInt(1, 20)),
    ), 2)
})

export const StrengthRing = (level) => new Item({
    name: 'Strength Ring',
    description: 'A gold ring, that gives you strength.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Rare,
    stats: new ItemStats({
        armor: RandInt(level, level + 20),
    }),
    modifiers: Choose(List.of<Modifier>(
        StrengthUp(RandInt(1, 35)),
    ), 1)
})

export const SpeedRing = (level) => new Item({
    name: 'Speed Ring',
    description: 'A gold ring, that gives you increased speed.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Rare,
    stats: new ItemStats({
        armor: RandInt(level, level + 20),
    }),
    modifiers: Choose(List.of<Modifier>(
        SpeedUp(RandInt(1, 35)),
    ), 1)
})