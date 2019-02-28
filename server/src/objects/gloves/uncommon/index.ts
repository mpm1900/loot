import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const UncommonGloves = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Uncommon, ItemSubType.Gloves, level)
), 1)).first()