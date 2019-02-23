import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item'
import { ItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { WeaponPowerUp } from '../../modifiers/weapon.mod'
import { SpeedUp } from '../../modifiers/speed.mod'
import { PoisonResistanceUp } from '../../modifiers/status.mod'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement } from '../../../types/element'
import { SpecialUp } from '../../modifiers/special.mod'
import { getWeaponAccuracy, getWeaponPower } from '../../../objects/stats'


const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Longsword,
    elements: Choose(
        List.of(FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement).map(f => f(20)),
        RandInt(0, 3)
    ),
    modifiers: List<Modifier>()
        .concat(
            Choose(
                List([
                    ArmorUp(RandInt(5, 20)),
                    StrengthUp(RandInt(5, 20)),
                    HealthUp(RandInt(5, 20)),
                    WeaponPowerUp(RandInt(5, 20)),
                    SpecialUp(RandInt(5, 20)),
                    PoisonResistanceUp(RandInt(5, 20)),
                    SpeedUp(RandInt(5, 20))
                ]),
                2
            )
        )
})

const baseStats = (level: number) => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Rare, ItemWeaponType.Longsword)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Rare, ItemWeaponType.Longsword)
    return {
        power: RandInt(...powerRange),
        range: 2,
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(0, 0.5),
        criticalRatio: RandFloat(1, 2)
    }
}

export const RareLongsword = (level: number) => new Item({
    ...base(level),
    name: 'Rare Longsword',
    description: 'A long sword, ready for battle, crafted by a master blacksmith',
    stats: new ItemStats({
        ...baseStats(level),
    }),
})