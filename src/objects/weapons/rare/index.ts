import { List } from 'immutable';
import { RareGreatsword } from './greatsword.item';
import { Choose } from '../../../types/random';

export const RareWeapon = (level) => Choose(List.of(
    RareGreatsword(level) 
), 1).first();