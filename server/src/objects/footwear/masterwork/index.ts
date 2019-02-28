import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const MasterworkFootware = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Masterwork, ItemSubType.Footwear, level)
), 1)).first()