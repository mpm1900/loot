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
import { SpecialUp } from '../../modifiers/special.mod'
import { getArmorValue } from '../../stats'

export const UniqueCharm = (level: number) => (Choose(List.of(
    _UniqueCharm(level)
), 1)).first()

export const _UniqueCharm = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Unique, ItemSubType.Charm)
    return new Item({
        name: 'The Sorcerers Stone',
        description: 'Go to Hogwarts you ding-bag.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Charm,
        rarity: ItemRarity.Unique,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(
            List.of<Modifier>(
                ArmorUp(RandInt(10, 50)),
                SpeedUp(RandInt(10, 50)),
                HealthUp(RandInt(10, 50)),
                PoisonResistanceUp(RandInt(10, 50)),
                WeaponPowerUp(RandInt(10, 50)),
                SpecialUp(RandInt(10, 50)),
                StrengthUp(RandInt(10, 50))
            ),
            4
        )
    })
}