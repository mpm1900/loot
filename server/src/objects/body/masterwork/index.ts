import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const MasterworkBody = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Masterwork, ItemSubType.Body, level)
), 1)).first()