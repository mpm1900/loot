import { Choose, RandInt } from '../../../types/random'
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
import { getArmorValue } from '../../stats'
import { SpecialUp } from '../../modifiers/special.mod'

export const UncommonHelmet = (level: number) => (Choose(List.of(
    LeatherHelmet(level)
), 1)).first()


export const LeatherHelmet = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Uncommon, ItemSubType.Head)
    return new Item({
        name: Choose(List.of('Leather Helmet', 'War-torn Helmet', 'Broken Helment', 'Uncommon Helmet'), 1).first(),
        description: 'Complete with matching goggles!.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Head,
        rarity: ItemRarity.Uncommon,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: List<Modifier>()
            .merge(
                Choose(List.of<Modifier>(
                    ArmorUp(RandInt(1, 20)),
                    SpeedUp(RandInt(1, 20)),
                    HealthUp(RandInt(1, 20)),
                    SpecialUp(RandInt(1, 20)),
                    StrengthUp(RandInt(1, 20))),
                1)
            )
    })
}