import { AppRecord } from '..'
import { Character, CharacterRarity } from '../character'
import { Item, ItemRarity } from '../item'
import { List } from 'immutable'

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