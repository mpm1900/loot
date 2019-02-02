import { AppRecord } from '..'
import { Character } from '../character'
import { List } from 'immutable'
import { iCharacterModifier } from '../character/character.modifier'

export enum ModifierType {
    Default = 'Default',
    Static = 'Static',
    Status = 'Status',
    Mutation = 'Mutation',
}

export type sModifier = {
    name: string,
    description: string,
    turns: number | null,
    type: ModifierType,
    buff: boolean,
    affectedKeys: string[],
    mods: iCharacterModifier[],
}
export type iModifier = {
    name?: string,
    description?: string,
    turns?: number | null,
    type?: ModifierType,
    buff?: boolean,
    affectedKeys?: List<string>,
    mods?: List<iCharacterModifier>,
}
export const defaultModifier: iModifier = {
    name: '',
    description: '',
    turns: null,
    type: ModifierType.Default,
    buff: false,
    affectedKeys: List<string>(),
    mods: List<iCharacterModifier>(),
}
export class Modifier extends AppRecord implements iModifier {
    public readonly name: string
    public readonly description: string
    public readonly turns: number | null
    public readonly type: ModifierType
    public readonly buff: boolean
    public readonly affectedKeys: List<string>
    public readonly mods: List<iCharacterModifier>

    constructor(args?: iModifier) {
        args ?
            super({ ...defaultModifier, ...args } as iModifier) :
            super(defaultModifier)
    }

    with(values: iModifier): Modifier {
        return super.with(values) as Modifier
    }

    serialize(): sModifier {
        return {
            name: this.name,
            description: this.description,
            turns: this.turns,
            type: this.type,
            buff: this.buff,
            affectedKeys: this.affectedKeys.toArray(),
            mods: this.mods.toArray()
        }
    }

    static deserialize(sModifier: sModifier): Modifier {
        return new Modifier({
            name: sModifier.name,
            description: sModifier.description,
            turns: sModifier.turns,
            type: sModifier.type,
            buff: sModifier.buff,
            affectedKeys: List<string>(sModifier.affectedKeys),
            mods: List<iCharacterModifier>(sModifier.mods)
        })
    }
}