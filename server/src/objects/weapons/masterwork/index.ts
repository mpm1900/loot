import { List } from 'immutable'
import { Choose } from '../../../types/random'
import { MasterworkGreatword } from './greatsword.item'
import { MasterworkLongsword } from './longsword.item'
import { MasterworkDagger } from './dagger.item'

export const MasterworkWeapon = (level: number) => Choose(List.of(
    MasterworkGreatword(level),
    MasterworkLongsword(level),
    MasterworkDagger(level),
), 1).first();