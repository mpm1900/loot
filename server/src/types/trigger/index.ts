import { List } from 'immutable'
import { Modifier, sModifier } from '../modifier';
import { AppRecord } from '..';

export enum TriggerType {
    Default = 'DEF',
    OnHit = 'OnHit',
    OnDamage = 'OnDamage',
    OnEnter = 'OnEnter',
    OnSwitch = 'OnSwitch',
    OnDeath = 'OnDeath',
    OnTurnStart = 'OnTurnStart',
    OnTurnEnd = 'OnTurnEnd',
}

export type sTrigger = {
    type: TriggerType,
    name: string,
    description: string,
    chance: number,
    buff: boolean,
    modifiers: sModifier[],
    targetModifiers: sModifier[],
}

export type iTrigger = {
    type?: TriggerType,
    name?: string,
    description?: string,
    chance?: number,
    buff?: boolean,
    modifiers?: List<Modifier>,
    targetModifiers?: List<Modifier>
}

export const defaultTrigger = {
    type: TriggerType.Default,
    name: '',
    description: '',
    chance: 1,
    buff: true,
    modifiers: List<Modifier>(),
    targetModifiers: List<Modifier>(),
}

export class Trigger extends AppRecord implements iTrigger {
    public readonly type: TriggerType
    public readonly name: string
    public readonly description: string
    public readonly chance: number
    public readonly buff: boolean
    public readonly modifiers: List<Modifier>
    public readonly targetModifiers: List<Modifier>

    constructor(args?: iTrigger) {
        args ?
            super({ ...defaultTrigger, ...args } as iTrigger) :
            super(defaultTrigger)
    }

    with(values: iTrigger): Modifier {
        return super.with(values) as Modifier
    }

    serialize(): sTrigger {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            chance: this.chance,
            buff: this.buff,
            modifiers: this.modifiers.map(modifier => modifier.serialize()).toArray(),
            targetModifiers: this.targetModifiers.map(modifier => modifier.serialize()).toArray()
        }
    }

    static deserialize(sTrigger: sTrigger): Trigger {
        return new Trigger({
            type: sTrigger.type,
            name: sTrigger.name,
            description: sTrigger.description,
            chance: sTrigger.chance,
            buff: sTrigger.buff,
            modifiers: List<Modifier>(sTrigger.modifiers.map(sModifier => Modifier.deserialize(sModifier))),
            targetModifiers: List<Modifier>(sTrigger.targetModifiers.map(sModifier => Modifier.deserialize(sModifier)))
        })
    }
}