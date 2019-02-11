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
import { SpecialUp } from '../../../objects/modifiers/special.mod'
import { getArmorValue } from '../../stats'

export const RareGloves = (level: number) => (Choose(List.of(
    MagicalGloves(level)
), 1)).first()


export const MagicalGloves = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Rare, ItemSubType.Gloves)
    return new Item({
        name: 'Magical Gloves',
        description: 'Some magical gloves fit for battle.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Gloves,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
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