import { List } from 'immutable'
import { MasterworkGreatword } from './greatsword.item'
import { Choose } from '../../../types/random'
import { MasterworkLongsword } from './longsword.item';

export const MasterworkWeapon = (level: number) => Choose(List.of(
    MasterworkGreatword(level),
    MasterworkLongsword(level),
), 1).first();