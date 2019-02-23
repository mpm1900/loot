import { List } from 'immutable'
import { Choose } from '../../../types/random'
import { UncommonGreatsword } from './greatsword.item'
import { UncommonLongsword } from './longsword.item'

export const UncommonWeapon = (level: number) => Choose(List.of(
    UncommonGreatsword(level),
    UncommonLongsword(level),
), 1).first();