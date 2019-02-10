import { List } from 'immutable';
import { Choose, RandInt, RandFloat, RangeFuncChoose } from '../../../types/random';
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item';
import { ItemStats } from '../../../types/item/item.stats';
import { Modifier } from '../../../types/modifier';
import { ArmorUp } from '../../modifiers/armor.mod';
import { StrengthUp } from '../../modifiers/strength.mod';
import { HealthUp } from '../../modifiers/health.mod';
import { WeaponPowerUp } from '../../modifiers/weapon.mod';
import { SpeedUp, SpeedDown } from '../../modifiers/speed.mod';
import { PoisonResistanceUp } from '../../modifiers/status.mod'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement } from '../../../types/element';
import { SpecialUp } from '../../modifiers/special.mod';


const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Masterwork,
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
                    ArmorUp(RandInt(5, 40)),
                    StrengthUp(RandInt(5, 40)),
                    HealthUp(RandInt(5, 40)),
                    WeaponPowerUp(RandInt(5, level + 20)),
                    SpecialUp(RandInt(5, level + 20)),
                    PoisonResistanceUp(RandInt(1, 20)),
                    SpeedUp(RandInt(5, 20))
                ]),
                RandInt(3, 5)
            )
        )
})

const baseStats = (level: number) => ({
    power: RandInt(80, 150),
    range: 2,
    accuracy: RandFloat(0.9, 1),
    affinity: RandFloat(0, 0.5),
    criticalRatio: RandFloat(1, 2)
})

export const MasterworkLongsword = (level: number) => new Item({
    ...base(level),
    name: 'Masterwork Longsword',
    description: 'A long sword, ready for battle, crafted by a master blacksmith',
    stats: new ItemStats({
        ...baseStats(level),
    }),
})