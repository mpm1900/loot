import { List } from 'immutable';
import { CommonGreatsword } from './greatsword.item';
import { CommonLongsword } from './longsword.item';
import { Choose } from '../../../types/random';

export const CommonWeapon = (level) => Choose(List.of( 
    CommonGreatsword(level),
    CommonLongsword(level),
), 1).first();