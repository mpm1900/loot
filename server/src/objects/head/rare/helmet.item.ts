import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const RareHelmet = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Rare, ItemSubType.Head, level)
), 1)).first()