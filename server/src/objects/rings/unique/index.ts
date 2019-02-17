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
import { Trigger } from '../../../types/trigger'
import { DamageOnDamage } from '../../../objects/triggers'

export const UniqueRing = (level: number) => (Choose(List.of(
    RingOfMarbas(level),
), 1)).first()

export const RingOfMarbas = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Unique, ItemSubType.Ring)
    return new Item({
        name: 'Ring of Marbas',
        description: 'President of the Abysal Church, among his power, he answers with trust any question.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Unique,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            ArmorUp(RandInt(10, 50)),
            SpeedUp(RandInt(10, 50)),
            HealthUp(RandInt(10, 50)),
            StrengthUp(RandInt(10, 50)),
            SpecialUp(RandInt(10, 50)),
            WeaponPowerUp(RandInt(10, 50)),
            PoisonResistanceUp(RandInt(10, 50)),
        ), 3),
        triggers: List.of<Trigger>(DamageOnDamage(RandInt(1, 40))),
    })
}