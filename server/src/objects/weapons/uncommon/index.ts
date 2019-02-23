import { List } from 'immutable'
import { Choose } from '../../../types/random'
import { UncommonGreatsword } from './greatsword.item'
import { UncommonLongsword } from './longsword.item'
import { UncommonDagger } from './dagger.item'

export const UncommonWeapon = (level: number) => Choose(List.of(
    UncommonGreatsword(level),
    UncommonLongsword(level),
    UncommonDagger(level),
), 1).first();