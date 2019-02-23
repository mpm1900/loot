import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { WeaponPowerUp } from '../../modifiers/weapon.mod'
import { SpeedUp, SpeedDown } from '../../modifiers/speed.mod'
import { PoisonResistanceUp } from '../../modifiers/status.mod'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement, Element } from '../../../types/element'
import { Trigger } from '../../../types/trigger'
import { HealOnHit } from '../../../objects/triggers'
import { getWeaponAccuracy } from '../../../objects/stats'

export const UniqueWeapon = (level: number) => Choose(List.of(
    ProfanedGreatsword(level),
    DarkSwordOfMarbas(level)
), 1).first();


export const ProfanedGreatsword = (level: number) => {
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Masterwork, ItemWeaponType.Greatsword)
    return new Item({
        name: 'Profaned Greatsword',
        description: 'Praise the sun.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Weapon,
        weaponType: ItemWeaponType.Greatsword,
        rarity: ItemRarity.Unique,
        stats: new ItemStats({
            power: RandInt(300, 500),
            range: 2,
            status: null,
            element: null,
            accuracy: RandFloat(...accuracyRange),
            affinity: RandFloat(0, 0.3),
            criticalRatio: RandFloat(1.5, 3)
        }),
        elements: List.of<Element>(FireElement(RandInt(15, 100))),
        modifiers: List<Modifier>()
            .concat(
                Choose(
                    List([
                        ArmorUp(RandInt(1, 120)),
                        StrengthUp(RandInt(1, 120)),
                        HealthUp(RandInt(5, 120)),
                        WeaponPowerUp(RandInt(5, 120))
                    ]),
                    4
                )
            )
            .push(SpeedDown(RandInt(5, Math.floor(100 / 2)))),
    })
}

export const DarkSwordOfMarbas = (level: number) => {
    return new Item({
        name: 'Dark Sword of Marbas',
        description: 'He answers truly on hidden or secret things, causes and heals diseases, teaches medical arts, and changes men into other shapes',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Weapon,
        weaponType: ItemWeaponType.Longsword,
        rarity: ItemRarity.Unique,
        stats: new ItemStats({
            power: RandInt(150, 240),
            range: 2,
            status: null,
            element: null,
            accuracy: RandFloat(0.9, 1),
            affinity: RandFloat(0.3, 0.5),
            criticalRatio: RandFloat(1, 2)
        }),
        elements: List.of<Element>(DarkElement(RandInt(12, 40))),
        modifiers: List<Modifier>()
            .concat(
                Choose(
                    List([
                        ArmorUp(RandInt(1, 120)),
                        StrengthUp(RandInt(1, 120)),
                        HealthUp(RandInt(5, 120)),
                        WeaponPowerUp(RandInt(5, 120))
                    ]),
                    4
                )
            ),
        triggers: List.of<Trigger>(HealOnHit(RandInt(1, 30)))
    })
}