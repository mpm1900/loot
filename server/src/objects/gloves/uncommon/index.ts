import { Choose,  RandInt } from '../../../types/random'
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

export const UncommonGloves = (level: number) => (Choose(List.of(
    LeatherGloves(level)
), 1)).first()


export const LeatherGloves = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Uncommon, ItemSubType.Gloves)
    return new Item({
        name: Choose(List.of('Leather Gloves', 'War-torn Gloves', 'Broken Gloves', 'Uncommon Gloves'), 1).first(),
        description: 'Great for driving!',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Gloves,
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
                    StrengthUp(RandInt(1, 20)),
                    SpecialUp(RandInt(1, 20)),
                    PoisonResistanceUp(RandInt(1, 20)),
                    WeaponPowerUp(RandInt(1, 20))),
                1)
            )
    })
}