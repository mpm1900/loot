import { List } from 'immutable'
import { Guage, sGuage } from '../guage'
import { Modifier, sModifier } from '../modifier'
import { ElementType, Element, sElement } from '../element'
import { AppRecord } from '..'

export type sSkill = {
    __uuid: string,
    name: string,
    description: string,
    cooldown: sGuage,
    modifiers: sModifier[],
    targetModifiers: sModifier[],
    status: sElement[],
    elements: sElement[],
    elementTypes: ElementType[],
}
export type iSkill = {
    __uuid?: string,
    name?: string,
    description?: string,
    cooldown?: Guage,
    modifiable?: boolean,
    modifiers?: List<Modifier>,
    targetModifiers?: List<Modifier>,
    status?: List<Element>,
    elements?: List<Element>,
    elementTypes?: List<ElementType>,
}
const defaultSkill: iSkill = {
    name: '',
    description: '',
    cooldown: new Guage(),
    modifiable: true,
    modifiers: List<Modifier>(),
    targetModifiers: List<Modifier>(),
    status: List<Element>(),
    elements: List<Element>(),
    elementTypes: List<ElementType>()
}
export class Skill extends AppRecord implements iSkill {
    public readonly name: string
    public readonly description: string
    public readonly cooldown: Guage
    public readonly modifiers: List<Modifier>
    public readonly targetModifiers: List<Modifier>
    public readonly status: List<Element>
    public readonly elements: List<Element>
    public readonly elementTypes: List<ElementType>

    public get text(): string {
        let returnText = ''
        this.elements.forEach(element => {
            returnText += `Deal ${element.power} ${element.type}`
        })
        this.modifiers.forEach(modifier => {
            returnText += modifier.description
        })
        return returnText;
    }

    constructor(args?: iSkill) {
        args ?
            super({ ...defaultSkill, ...args } as iSkill) :
            super(defaultSkill)
    }

    with(values: iSkill): Skill {
        return super.with(values) as Skill
    }

    serialize(): sSkill {
        return {
            __uuid: this.__uuid,
            name: this.name,
            description: this.description,
            cooldown: this.cooldown.serialize(),
            modifiers: this.modifiers.map(modifier => modifier.serialize()).toArray(),
            targetModifiers: this.targetModifiers.map(modifier => modifier.serialize()).toArray(),
            status: this.status.map(element => element.serialize()).toArray(),
            elements: this.elements.map(element => element.serialize()).toArray(),
            elementTypes: this.elementTypes.toArray(),
        }
    }

    static deserialize(sSkill: sSkill): Skill {
        return new Skill({
            __uuid: sSkill.__uuid,
            name: sSkill.name,
            description: sSkill.description,
            cooldown: Guage.deserialize(sSkill.cooldown),
            modifiers: List<Modifier>(sSkill.modifiers.map(sModifier => Modifier.deserialize(sModifier))),
            targetModifiers: List<Modifier>(sSkill.targetModifiers.map(sModifier => Modifier.deserialize(sModifier))),
            status: List<Element>(sSkill.status.map(sElement => Element.deserialize(sElement))),
            elements: List<Element>(sSkill.elements.map(sElement => Element.deserialize(sElement))),
            elementTypes: List<ElementType>(sSkill.elementTypes),
        })
    }
}