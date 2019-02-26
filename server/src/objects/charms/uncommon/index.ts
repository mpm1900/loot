import { List } from 'immutable'
import { Choose } from '../../../types/random'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const UncommonCharm = (level: number) => (Choose(List([
    RandomArmor(ItemRarity.Uncommon, ItemSubType.Charm, level),
]), 1)).first()
