import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const MasterworkGloves = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Masterwork, ItemSubType.Gloves, level)
), 1)).first()