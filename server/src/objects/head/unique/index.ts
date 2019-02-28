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

export const UniqueHelmet = (level: number) => (Choose(List.of(
    MitreOfMarbas(level)
), 1)).first()

export const MitreOfMarbas = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Unique, ItemSubType.Head)
    return new Item({
        name: 'Mitre of Marbas',
        description: 'Also, he’s able to cause illness or endow the magician with health.',
        image: '-- IMAGE URL --',
        level,
        rarity: ItemRarity.Unique,
        type: ItemType.Equipable,
        subType: ItemSubType.Head,
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
                    StrengthUp(RandInt(10, 50)),
                ),
            4)
    })
}