import { AppRecord } from '..';
import { Modifier, sModifier } from '../modifier';
import { List } from 'immutable';
import { ItemStats, sItemStats } from './item.stats';
import { RandFloat } from '../random';
import { Element, sElement } from '../element';
import { sTrigger, Trigger } from '../trigger';

export enum ItemType {
    Default = 'Default',
    Equipable = 'Equipable',
    Consumable = 'Consumable'
}

export enum ItemSubType {
    Default = 'Default',
    Weapon = 'Weapon',
    Charm = 'Charm',
    Ring = 'Ring',
    Head = 'Head',
    Body = 'Body',
    Footwear = 'Footwear',
    Gloves = 'Gloves',
}

export const ItemSubTypes = [
    ItemSubType.Weapon,
    ItemSubType.Charm,
    ItemSubType.Ring,
    ItemSubType.Head,
    ItemSubType.Body,
    ItemSubType.Footwear,
    ItemSubType.Gloves,
]

export enum ItemWeaponType {
    NotAWeapon = 'NotAWeapon',
    Greatsword = 'Greatsword',
    Longsword = 'Longsword',
    Dagger = 'Dagger',
}

export enum ItemRarity {
    Default = 'Default',
    Common = 'Common',
    Uncommon = 'Uncommon',
    Rare = 'Rare',
    Masterwork = 'Masterwork',
    Unique = 'Unique',
    BlackMarket = 'BlackMarket',
}

export const ItemRarities = [
    ItemRarity.Common,
    ItemRarity.Uncommon,
    ItemRarity.Rare,
    ItemRarity.Masterwork,
    ItemRarity.Unique,
    ItemRarity.BlackMarket,
]

export const ItemRarities_Chance = {
    [ItemRarity.Common]: 52,
    [ItemRarity.Uncommon]: 100,
    [ItemRarity.Rare]: 50,
    [ItemRarity.Masterwork]: 25,
    [ItemRarity.Unique]: 12,
    [ItemRarity.BlackMarket]: 1
}

export const getRarity = () => {
    // return ItemRarities.Masterwork
    const roll = 100 - RandFloat(0, 100)
    if (roll <= ItemRarities_Chance[ItemRarity.BlackMarket]) return ItemRarity.BlackMarket
    if (roll <= ItemRarities_Chance[ItemRarity.Unique]) return ItemRarity.Unique
    if (roll <= ItemRarities_Chance[ItemRarity.Masterwork]) return ItemRarity.Masterwork
    if (roll <= ItemRarities_Chance[ItemRarity.Rare]) return ItemRarity.Rare
    if (roll <= ItemRarities_Chance[ItemRarity.Uncommon]) return ItemRarity.Uncommon
    return ItemRarity.Common;
}

export type sItem = {
    __uuid: string,
    __name: string,
    name: string,
    description: string,
    image: string,
    type: ItemType,
    subType: ItemSubType,
    weaponType: ItemWeaponType,
    level: number,
    rarity: ItemRarity,
    parentId: string | null,
    parentType: string | null,
    parentIndex: number | null,
    modifiers: sModifier[],
    triggers: sTrigger[],
    stats: sItemStats,
    elements: sElement[]
}
export type iItem = {
    __uuid?: string,
    name?: string,
    description?: string,
    image?: string,
    type?: ItemType,
    subType?: ItemSubType,
    weaponType?: ItemWeaponType,
    level?: number,
    rarity?: ItemRarity,
    parentId?: string | null,
    parentType?: string | null,
    parentIndex?: number | null,
    modifiers?: List<Modifier>,
    triggers?: List<Trigger>,
    stats?: ItemStats,
    elements?: List<Element>
}
const defaultItem: iItem = {
    name: '',
    description: '',
    image: '',
    type: ItemType.Default,
    subType: ItemSubType.Default,
    weaponType: ItemWeaponType.NotAWeapon,
    level: 0,
    rarity: ItemRarity.Common,
    parentId: null,
    parentType: null,
    parentIndex: null,
    modifiers: List<Modifier>(),
    triggers: List<Trigger>(),
    stats: new ItemStats(),
    elements: List<Element>(),
}
export class Item extends AppRecord implements iItem {
    public readonly name: string
    public readonly description: string
    public readonly image: string
    public readonly type: ItemType
    public readonly subType: ItemSubType
    public readonly weaponType: ItemWeaponType
    public readonly level: number
    public readonly rarity: ItemRarity.Default
    public readonly parentId: string
    public readonly parentType: string
    public readonly parentIndex: number
    public readonly modifiers: List<Modifier>
    public readonly triggers: List<Trigger>
    public readonly stats: ItemStats
    public readonly elements: List<Element>

    constructor(args?: iItem) {
        args ?
            super({ ...defaultItem, ...args } as iItem) :
            super(defaultItem)
    }

    with(values: iItem): Item {
        return super.with(values) as Item
    }

    get effects(): List<Modifier | Trigger> {
        return List<Modifier | Trigger>()
            .concat(this.modifiers)
            .concat(this.triggers)
    }

    serialize(): sItem {
        return {
            __uuid: this.__uuid,
            __name: this.__name,
            name: this.name,
            description: this.description,
            image: this.image,
            type: this.type,
            subType: this.subType,
            weaponType: this.weaponType,
            level: this.level,
            rarity: this.rarity,
            parentId: this.parentId,
            parentType: this.parentType,
            parentIndex: this.parentIndex,
            modifiers: this.modifiers.map(modifier => modifier.serialize()).toArray(),
            triggers: this.triggers.map(trigger => trigger.serialize()).toArray(),
            stats: this.stats.serialize(),
            elements: this.elements.map(element => element.serialize()).toArray(),
        }
    }

    static deserialize(sItem: sItem): Item {
        return new Item({
            __uuid: sItem.__uuid,
            name: sItem.name,
            description: sItem.description,
            image: sItem.image,
            type: sItem.type,
            subType: sItem.subType,
            weaponType: sItem.weaponType,
            level: sItem.level,
            rarity: sItem.rarity,
            parentId: sItem.parentId,
            parentType: sItem.parentType,
            parentIndex: sItem.parentIndex,
            modifiers: List<Modifier>(sItem.modifiers.map(sModifier => Modifier.deserialize(sModifier))),
            triggers: List<Trigger>(sItem.triggers.map(sTrigger => Trigger.deserialize(sTrigger))),
            stats: ItemStats.deserialize(sItem.stats),
            elements: List<Element>(sItem.elements.map(sElement => Element.deserialize(sElement)))
        })
    }
}