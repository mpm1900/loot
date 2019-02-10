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

export const RareHelmet = (level: number) => (Choose(List.of(
    MagicalHelmet(level)
), 1)).first()


export const MagicalHelmet = (level: number) => new Item({
    name: 'Magical Helmet',
    description: 'A helmet pulsing with heat.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Head,
    rarity: ItemRarity.Rare,
    stats: new ItemStats({
        armor: RandInt(level, level + 60),
    }),
    modifiers: Choose(
        List.of<Modifier>(
            ArmorUp(RandInt(1, 20)),
            SpeedUp(RandInt(1, 20)),
            HealthUp(RandInt(1, 20)),
            PoisonResistanceUp(RandInt(1, 20)),
            SpecialUp(RandInt(1, 20)),
            StrengthUp(RandInt(1, 20)),
        ),
        2
    )
})