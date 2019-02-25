import { ItemRarity, ItemWeaponType } from '../types/item'
import { ArmorUp } from './modifiers/armor.mod'
import { StrengthUp } from './modifiers/strength.mod'
import { SpeedDown, SpeedUp } from './modifiers/speed.mod'
import { Choose, RandInt } from '../types/random'
import { List } from 'immutable'
import { WeaponPowerUp } from './modifiers/weapon.mod'
import { HealthUp } from './modifiers/health.mod'
import { SpecialUp } from './modifiers/special.mod'

export const randomWeaponModifiers: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ ArmorUp, StrengthUp ],
        [ItemWeaponType.Longsword]:     [ ArmorUp, StrengthUp ],
        [ItemWeaponType.Dagger]:        [ ArmorUp, StrengthUp ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp ],
        [ItemWeaponType.Longsword]:     [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp, SpeedUp ],
        [ItemWeaponType.Dagger]:        [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp ],
        [ItemWeaponType.Longsword]:     [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp, SpeedUp ],
        [ItemWeaponType.Dagger]:        [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp ],
    }
}
export const randomWeaponRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ [1, 20], [1, 20] ],
        [ItemWeaponType.Longsword]:     [ [1, 20], [1, 20] ],
        [ItemWeaponType.Dagger]:        [ [1, 20], [1, 20] ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ [5, 20], [5, 20], [5, 20], [5, 20] ],
        [ItemWeaponType.Longsword]:     [ [5, 20], [5, 20], [5, 20], [5, 20], [5, 20], [5, 20] ],
        [ItemWeaponType.Dagger]:        [ [5, 20], [5, 20], [5, 20], [5, 20], [5, 20] ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ [10, 40], [10, 40], [10, 40], [10, 40] ],
        [ItemWeaponType.Longsword]:     [ [10, 40], [10, 40], [10, 40], [10, 40], [10, 40], [10, 40] ],
        [ItemWeaponType.Dagger]:        [ [10, 40], [10, 40], [10, 40], [10, 40], [10, 40] ],
    },
}
export const randomWeaponCountRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [1, 1],
        [ItemWeaponType.Longsword]:     [1, 1],
        [ItemWeaponType.Dagger]:        [1, 1],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [2, 2],
        [ItemWeaponType.Longsword]:     [2, 2],
        [ItemWeaponType.Dagger]:        [2, 2],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [3, 5],
        [ItemWeaponType.Longsword]:     [3, 5],
        [ItemWeaponType.Dagger]:        [3, 5],
    },
}
export const staticWeaponModifers: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ SpeedDown ],
        [ItemWeaponType.Longsword]:     [] as any[],
        [ItemWeaponType.Dagger]:        [ SpeedUp ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ SpeedDown ],
        [ItemWeaponType.Longsword]:     [] as any[],
        [ItemWeaponType.Dagger]:        [ SpeedUp ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ SpeedDown ],
        [ItemWeaponType.Longsword]:     [] as any[],
        [ItemWeaponType.Dagger]:        [ SpeedUp ],
    },
}
export const staticWeaponRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ [5, 20] ],
        [ItemWeaponType.Longsword]:     [] as any[],
        [ItemWeaponType.Dagger]:        [ [5, 20] ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ [5, 20] ],
        [ItemWeaponType.Longsword]:     [] as any[],
        [ItemWeaponType.Dagger]:        [ [5, 20] ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ [5, 40] ],
        [ItemWeaponType.Longsword]:     [] as any[],
        [ItemWeaponType.Dagger]:        [ [5, 40] ],
    },
}

export const getWeaponModifiers = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    const randomModifiers = Choose(
        List(randomWeaponModifiers[rarity][weaponType].map((f: Function, i: number) => (
            f(RandInt(...(randomWeaponRanges[rarity][weaponType][i] as [number, number])))
        ))),
        RandInt(...randomWeaponCountRanges[rarity][weaponType] as [number, number])
    )
    const staticModifiers = List(staticWeaponModifers[rarity][weaponType].map((f: any, i: number) => (
        f(RandInt(...(staticWeaponRanges[rarity][weaponType][i] as [number, number])))
    )))
    return randomModifiers.concat(staticModifiers)
}