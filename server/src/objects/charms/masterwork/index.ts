import { List } from 'immutable'
import { Choose } from '../../../types/random'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const MasterworkCharm = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Masterwork, ItemSubType.Charm, level)
), 1)).first()