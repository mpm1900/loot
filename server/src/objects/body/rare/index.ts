import { Choose, RangeFunc, RangeFuncChoose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { ArmorUp } from '../../modifiers/armor.mod'
import { SpeedUp } from '../../modifiers/speed.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { PoisonResistanceUp } from '../../modifiers/status.mod'
import { WeaponPowerUp } from '../../modifiers/weapon.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { Modifier } from '../../../types/modifier'
import { ItemStats } from '../../../types/item/item.stats'
import { SpecialUp } from '../../../objects/modifiers/special.mod'
import { getArmorValue } from '../../stats';

export const RareBody = (level: number) => (Choose(List.of(
    MagicalArmor(level)
), 1)).first()


export const MagicalArmor = (level: number) => {
    const range = getArmorValue(ItemRarity.Rare, ItemSubType.Body)
    return new Item({
        name: 'Magical Armor',
        description: 'Some armor pulsing with magical energy.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Body,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(range[0], range[1]),
        }),
        modifiers: Choose(
            List.of<Modifier>(
                ArmorUp(RandInt(1, 20)),
                SpeedUp(RandInt(1, 20)),
                HealthUp(RandInt(1, 20)),
                PoisonResistanceUp(RandInt(1, 20)),
                SpecialUp(RandInt(1, 20)),
                StrengthUp(RandInt(1, 20)),
                WeaponPowerUp(1, 20),
            ),
            2
        )
    })
}