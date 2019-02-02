import { List } from 'immutable';
import { Choose, RandInt, RandFloat, RangeFuncChoose } from '../../../types/random';
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item';
import { ItemStats } from '../../../types/item/item.stats';
import { Modifier } from '../../../types/modifier';
import { ArmorUp } from '../../modifiers/armor.mod';
import { StrengthUp } from '../../modifiers/strength.mod';
import { HealthUp } from '../../modifiers/health.mod';
import { WeaponPowerUp } from '../../modifiers/weapon.mod';
import { SpeedUp, SpeedDown } from '../../modifiers/speed.mod';
import { PoisonResistanceUp } from '../../modifiers/status.mod'
import { FireElement, WaterElement, GrassElement, ThunderElement, EarthElement, IceElement, DragonElement, LightElement, DarkElement, Element } from '../../../types/element';

export const UniqueWeapon = (level) => Choose(List.of( 
    ProfanedGreatsword(level)
), 1).first();


export const ProfanedGreatsword = (level) => new Item({
    name: 'Profaned Greatsword',
    description: 'Praise the sun.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Greatsword,
    rarity: ItemRarity.Unique,
    stats: new ItemStats({
        power: RandInt(level + 50, (level * 4) + 50),
        range: 2,
        status: null,
        element: null,
        accuracy: RandFloat(0.7, 0.85),
        affinity: RandFloat(0, 0.3),
        criticalRatio: RandFloat(1.5, 3)
    }),
    elements: List.of<Element>(FireElement(100)),
    modifiers: List<Modifier>()
        .merge(
            Choose(
                List([
                    ...RangeFuncChoose(1, level + 20, ArmorUp, 1).toJS(),
                    ...RangeFuncChoose(1, level + 20, StrengthUp, 1).toJS(),
                    ...RangeFuncChoose(5, level + 20, HealthUp, 1).toJS(),
                    ...RangeFuncChoose(5, level + 20, WeaponPowerUp, 1).toJS()]),
                4
            )
        )
        .concat(RangeFuncChoose(0, Math.floor(level / 2), SpeedDown, 1)) as List<Modifier>
})