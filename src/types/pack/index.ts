import { AppRecord } from '..'
import { Character, CharacterRarity } from '../character'
import { Item, ItemRarity } from '../item'
import { List } from 'immutable'
import { CharacterFactory } from '../../objects/characters'
import { EquipItem, CommonEquipItem, UncommonEquipItem, RareEquipItem, MasterworkEquipItem, UniqueEquipItem, BlackMarketEquipItem } from '../../objects/equipItem'

export enum PackContentsType {
    Character = 'Character',
    Item = 'Item',
}
export type PackContents = {
    type: PackContentsType,
    rarity: ItemRarity | CharacterRarity | null,
    level: number,
}
export enum PackType {
    Default = 'Default',
}

const getObjectFromContents = (contents: PackContents): (Character | Item) => {
    switch (contents.type) {
        case PackContentsType.Character: return getCharacter(contents.rarity as CharacterRarity, contents.level)
        case PackContentsType.Item: return getItem(contents.rarity as ItemRarity, contents.level)
    }
}

const getItem = (rarity: ItemRarity, level: number): Item => {
    switch (rarity) {
        case ItemRarity.Common: return CommonEquipItem(level)
        case ItemRarity.Uncommon: return UncommonEquipItem(level)
        case ItemRarity.Rare: return RareEquipItem(level)
        case ItemRarity.Masterwork: return MasterworkEquipItem(level)
        case ItemRarity.Unique: return UniqueEquipItem(level)
        case ItemRarity.BlackMarket: return BlackMarketEquipItem(level)
        default: return EquipItem(level)
    }
}

const getCharacter = (rarity: CharacterRarity, level: number): Character => {
    switch (rarity) {
        default: return CharacterFactory(level)
    }
}
export type sPack = {
    __uuid: string,
    type: PackType,
    contents: PackContents[],
}
export type iPack = {
    __uuid?: string,
    type?: PackType,
    contents?: List<PackContents>
}
const defaultPack: iPack = {
    type: PackType.Default,
    contents: List<PackContents>(),
}
export class Pack extends AppRecord implements iPack {
    public readonly type: PackType
    public readonly contents: List<PackContents>

    constructor(args?: iPack) {
        args ?
            super({ ...defaultPack, ...args } as iPack) :
            super(defaultPack)
    }

    with(values: iPack): Pack {
        return super.with(values) as Pack
    }

    open(): List<Character | Item> {
        return this.contents.map(content => getObjectFromContents(content))
    }

    serialize(): sPack {
        return {
            __uuid: this.__uuid,
            type: this.type,
            contents: this.contents.toArray()
        }
    }

    static deserialize(sPack: sPack): Pack {
        return new Pack({
            __uuid: sPack.__uuid,
            type: sPack.type,
            contents: List<PackContents>(sPack.contents)
        })
    }
}