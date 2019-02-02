import { List } from 'immutable';
import { Choose, RandInt, RandFloat, RangeFuncChoose } from '../../../types/random';
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item';
import { ItemStats } from '../../../types/item/item.stats';
import { Modifier } from '../../../types/modifier';
import { ArmorUp } from '../../modifiers/armor.mod';
import { StrengthUp } from '../../modifiers/strength.mod';
import { HealthUp } from '../../modifiers/health.mod';
import { WeaponPowerUp } from '../../modifiers/weapon.mod';
import { SpeedUp } from '../../modifiers/speed.mod';
import { PoisonResistanceUp } from '../../modifiers/status.mod';


export const BlackMarketWeapon = (level) => Choose(List.of( 
    HomeRunBat(level)
), 1).first();


export const HomeRunBat = (level) => new Item({
    name: 'Home Run Bat',
    description: 'Knock Out.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Longsword,
    rarity: ItemRarity.BlackMarket,
    stats: new ItemStats({
        power: RandInt(level * 3, level * 10),
        range: 1,
        status: null,
        element: null,
        accuracy: RandFloat(0.01, 0.50),
        affinity: RandFloat(0, 0.8),
        criticalRatio: RandFloat(1, 3)
    }),
    modifiers: List<Modifier>()
        .merge(
            Choose(
                List<Modifier>()
                    .concat(RangeFuncChoose(1, level + 20, ArmorUp, 1))
                    .concat(RangeFuncChoose(1, level + 20, StrengthUp, 1))
                    .concat(RangeFuncChoose(5, level + 20, HealthUp, 1))
                    .concat(RangeFuncChoose(5, level + 20, WeaponPowerUp, 1))
                    .concat(RangeFuncChoose(1, level + 20, SpeedUp, 1))
                    .concat(RangeFuncChoose(1, level + 20, PoisonResistanceUp, 1)),
                5
            )
        )
})