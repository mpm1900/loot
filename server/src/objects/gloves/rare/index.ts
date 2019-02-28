import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const RareGloves = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Rare, ItemSubType.Gloves, level)
), 1)).first()