import { List } from 'immutable'
import { Choose } from '../../../types/random'
import { RareGreatsword } from './greatsword.item'
import { RareLongsword } from './longsword.item'

export const RareWeapon = (level: number) => Choose(List.of(
    RareGreatsword(level),
    RareLongsword(level),
), 1).first();