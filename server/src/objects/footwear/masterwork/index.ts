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
import { SpecialUp } from '../../modifiers/special.mod'
import { getArmorValue } from '../../stats'

export const MasterworkFootware = (level: number) => (Choose(List.of(
    MasterworkBoots(level)
), 1)).first()

export const MasterworkBoots = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Masterwork, ItemSubType.Footwear)
    return new Item({
        name: 'Masterwork Boots',
        description: 'A masterfully made boots.',
        image: '-- IMAGE URL --',
        level,
        rarity: ItemRarity.Masterwork,
        type: ItemType.Equipable,
        subType: ItemSubType.Footwear,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(
            List.of<Modifier>(
                    ArmorUp(RandInt(1, 4)),
                    SpeedUp(RandInt(1, 40)),
                    HealthUp(RandInt(1, 40)),
                    PoisonResistanceUp(RandInt(1, 40)),
                    WeaponPowerUp(RandInt(1, 40)),
                    SpecialUp(RandInt(1, 40)),
                    StrengthUp(RandInt(1, 40)),
                ),
            3)
    })
}