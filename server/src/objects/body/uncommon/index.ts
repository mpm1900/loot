import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { ItemRarity, ItemSubType } from '../../../types/item'
import { RandomArmor } from '../../../objects/armor'

export const UncommonBody = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Uncommon, ItemSubType.Body, level)
), 1)).first()