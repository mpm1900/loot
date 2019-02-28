import { Choose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import {  SpeedDown } from '../../modifiers/speed.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { ItemStats } from '../../../types/item/item.stats'
import { getArmorValue } from '../../stats';

export const UniqueBody = (level: number) => (Choose(List.of(
    ArmorOfStone(level)
), 1)).first()

export const ArmorOfStone = (level: number) => {
    const range = getArmorValue(ItemRarity.Unique, ItemSubType.Body)
    return new Item({
        name: 'Armor Of Stone',
        description: 'Armor of an ancient dragon slayer.',
        level,
        rarity: ItemRarity.Unique,
        type: ItemType.Equipable,
        subType: ItemSubType.Body,
        stats: new ItemStats({
            armor: RandInt(range[0] + 75, range[1] + 75)
        }),
        modifiers: Choose(
            List.of(
                    HealthUp(RandInt(5, 40)),
                    StrengthUp(RandInt(5, 40)),
                ),
            1)
            .concat(SpeedDown(RandInt(5, 40)))
    })
}