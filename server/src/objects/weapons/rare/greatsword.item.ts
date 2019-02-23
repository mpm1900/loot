import { List } from 'immutable'
import { Choose, RandInt, RandFloat, RangeFuncChoose } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { WeaponPowerUp } from '../../modifiers/weapon.mod'
import { SpeedDown } from '../../modifiers/speed.mod'
import { getWeaponPower } from '../../../objects/stats'

const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Greatsword,
    modifiers: Choose(
        List.of<Modifier>(
            ArmorUp(RandInt(5, 20)),
            StrengthUp(RandInt(5, 20)),
            WeaponPowerUp(RandInt(5, 20)),
            HealthUp(RandInt(5, 20)),
        ),
        1
    )
    .concat(RangeFuncChoose(5, 20, SpeedDown, 1)) as List<Modifier>
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Rare, ItemWeaponType.Greatsword)
    return {
        power: RandInt(...powerRange),
        range: 2,
        status: null,
        element: null,
        accuracy: RandFloat(0.7, 0.85),
        affinity: RandFloat(0, 0.3),
        criticalRatio: RandFloat(1, 2.5)
    }
}

export const RareGreatsword = (level: number) => new Item({
    ...base(level),
    name: Choose(List.of(
        'Rusty Greatsword',
        'Hard Metal Greatsword',
        'Stone Forged Greatsword',
        'Royal Greatsword',
        'Eternal Greatsword',
    ), 1).first(),
    description: 'Greatsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})