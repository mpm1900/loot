import { AppRecord } from '..'
import { List, Map } from 'immutable'
import { iCharacterModifier } from '../character/character.modifier'

export enum ModifierType {
    Default = 'Default',
    Static = 'Static',
    Status = 'Status',
    Mutation = 'Mutation',
}

export enum ModifierPayloadKey {
    Amount = 'amount'
}
export const ModifierPayloadKeys = List.of<ModifierPayloadKey>(
    ModifierPayloadKey.Amount,
)

export type sModifier = {
    name: string,
    description: string,
    turns: number | null,
    type: ModifierType,
    buff: boolean,
    affectedKeys: string[],
    mods: iCharacterModifier[],
    payload: any,
}
export type iModifier = {
    name?: string,
    description?: string,
    turns?: number | null,
    type?: ModifierType,
    buff?: boolean,
    affectedKeys?: List<string>,
    mods?: List<iCharacterModifier>,
    payload?: Map<ModifierPayloadKey, any>,
}
export const defaultModifier: iModifier = {
    name: '',
    description: '',
    turns: null,
    type: ModifierType.Default,
    buff: false,
    affectedKeys: List<string>(),
    mods: List<iCharacterModifier>(),
    payload: Map<ModifierPayloadKey, any>(),
}
export class Modifier extends AppRecord implements iModifier {
    public readonly name: string
    public readonly description: string
    public readonly turns: number | null
    public readonly type: ModifierType
    public readonly buff: boolean
    public readonly affectedKeys: List<string>
    public readonly mods: List<iCharacterModifier>
    public readonly payload: Map<ModifierPayloadKey, any>

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
            mods: this.mods.toArray(),
            payload: this.payload.toJS(),
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
            mods: List<iCharacterModifier>(sModifier.mods),
            payload: Map<ModifierPayloadKey, any>(sModifier.payload),
        })
    }
}