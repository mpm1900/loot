import { List } from 'immutable';
import { UncommonGreatsword } from './greatsword.item';
import { Choose } from '../../../types/random';

export const UncommonWeapon = (level) => Choose(List.of(
    UncommonGreatsword(level) 
), 1).first();