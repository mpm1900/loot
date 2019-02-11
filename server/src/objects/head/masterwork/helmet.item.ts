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

export const MasterworkHelmet = (level: number) => (Choose(List.of(
    _MasterworkHelmet(level)
), 1)).first()

export const _MasterworkHelmet = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Masterwork, ItemSubType.Head)
    return new Item({
        name: 'Masterwork Helmet',
        description: 'A masterfully made helmet.',
        image: '-- IMAGE URL --',
        level,
        rarity: ItemRarity.Masterwork,
        type: ItemType.Equipable,
        subType: ItemSubType.Head,
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