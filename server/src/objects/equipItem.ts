import { Choose } from '../types/random'
import { List } from 'immutable'
import { Weapon } from './weapons'
import { Charm } from './charms'
import { Head } from './head'
import { Ring } from './rings'
import { Body } from './body'
import { Footwear } from './footwear'
import { Gloves } from './gloves'
import { UniqueWeapon } from './weapons/unique'
import { UniqueCharm } from './charms/unique'
import { BlackMarketWeapon } from './weapons/blackmarket'


export const EquipItem = (level: number) => {
    return Choose(List.of(Weapon(level), Charm(level), Ring(level), Head(level), Body(level), Footwear(level), Gloves(level)), 1).first()
}

/*
export const UncommonEquipItem = (level: number) => {
    return Choose(List.of(UncommonWeapon(level), UncommonCharm(level), UncommonRing(level), UncommonHelmet(level), UncommonBody(level), UncommonFootwear(level), UncommonGloves(level)), 1).first()
}

export const RareEquipItem = (level: number) => {
    return Choose(List.of(RareWeapon(level), RareCharm(level), RareRing(level), RareHelmet(level), RareBody(level), RareFootware(level), RareGloves(level)), 1).first()
}

export const MasterworkEquipItem = (level: number) => {
    return Choose(List.of(MasterworkWeapon(level), MasterworkCharm(level), MasterworkRing(level), MasterworkHelmet(level), MasterworkBody(level), MasterworkFootware(level), MasterworkGloves(level)), 1).first()
}
*/

export const UniqueEquipItem = (level: number) => {
    return Choose(List.of(UniqueWeapon(level), UniqueCharm(level), /* UniqueRing(level), UniqueHead(level), UniqueBody(level), UniqueFootwear(level), UniqueGloves(level) */), 1).first()
}

export const BlackMarketEquipItem = (level: number) => {
    return Choose(List.of(BlackMarketWeapon(level), /*UniqueCharm(level), UniqueRing(level), UniqueHead(level), UniqueBody(level), UniqueFootwear(level), UniqueGloves(level) */), 1).first()
}