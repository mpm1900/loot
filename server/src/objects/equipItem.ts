import { Choose } from '../types/random'
import { List } from 'immutable'
import { Weapon } from './weapons'
import { Charm } from './charms'
import { Head } from './head'
import { Ring } from './rings'
import { Body } from './body'
import { Footwear } from './footwear'
import { Gloves } from './gloves'
import { CommonWeapon } from './weapons/common';
import { CommonCharm } from './charms/common';
import { UncommonWeapon } from './weapons/uncommon';
import { UncommonRing } from './rings/uncommon';
import { UncommonHelmet } from './head/uncommon/helmet.item';
import { UncommonBody } from './body/uncommon';
import { UncommonFootwear } from './footwear/uncommon';
import { UncommonGloves } from './gloves/uncommon';
import { RareWeapon } from './weapons/rare';
import { UncommonCharm } from './charms/uncommon';
import { RareCharm } from './charms/rare';
import { RareRing } from './rings/rare';
import { MasterworkWeapon } from './weapons/masterwork';
import { MasterworkCharm } from './charms/masterwork';
import { MasterworkRing } from './rings/masterwork';
import { UniqueWeapon } from './weapons/unique';
import { UniqueCharm } from './charms/unique';
import { BlackMarketWeapon } from './weapons/blackmarket';
import { RareHelmet } from './head/rare/helmet.item';
import { RareBody } from './body/rare';
import { RareFootware } from './footwear/rare';
import { RareGloves } from './gloves/rare';
import { MasterworkHelmet } from './head/masterwork/helmet.item';
import { MasterworkBody } from './body/masterwork';
import { MasterworkFootware } from './footwear/masterwork';
import { MasterworkGloves } from './gloves/masterwork';

export const EquipItem = (level: number) => {
    return Choose(List.of(Weapon(level), Charm(level), Ring(level), Head(level), Body(level), Footwear(level), Gloves(level)), 1).first()
}

export const CommonEquipItem = (level: number) => {
    return Choose(List.of(CommonWeapon(level), CommonCharm(level), /*CommonRing(level), CommonHead(level), Body(level), Footwear(level), Gloves(level) */), 1).first()
}

export const UncommonEquipItem = (level: number) => {
    return Choose(List.of(UncommonWeapon(level), UncommonCharm(level), UncommonRing(level), UncommonHelmet(level), UncommonBody(level), UncommonFootwear(level), UncommonGloves(level)), 1).first()
}

export const RareEquipItem = (level: number) => {
    return Choose(List.of(RareWeapon(level), RareCharm(level), RareRing(level), RareHelmet(level), RareBody(level), RareFootware(level), RareGloves(level)), 1).first()
}

export const MasterworkEquipItem = (level: number) => {
    return Choose(List.of(MasterworkWeapon(level), MasterworkCharm(level), MasterworkRing(level), MasterworkHelmet(level), MasterworkBody(level), MasterworkFootware(level), MasterworkGloves(level)), 1).first()
}

export const UniqueEquipItem = (level: number) => {
    return Choose(List.of(UniqueWeapon(level), UniqueCharm(level), /* UniqueRing(level), UniqueHead(level), UniqueBody(level), UniqueFootwear(level), UniqueGloves(level) */), 1).first()
}

export const BlackMarketEquipItem = (level: number) => {
    return Choose(List.of(BlackMarketWeapon(level), /*UniqueCharm(level), UniqueRing(level), UniqueHead(level), UniqueBody(level), UniqueFootwear(level), UniqueGloves(level) */), 1).first()
}