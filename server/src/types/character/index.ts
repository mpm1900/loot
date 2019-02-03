import { List } from 'immutable';
import { CharacterStatus, sCharacterStatus } from './character.status';
import { AppRecord } from '..';
import { Item, ItemType, ItemSubType, sItem } from '../item';
import { Skill, sSkill } from '../skill';
import { Modifier } from '../modifier';
import { ElementType } from '../element';
import { Weapon } from '../../objects/weapons'
import { Charm } from '../../objects/charms'
import { Ring } from '../../objects/rings'
import { Head } from '../../objects/head'
import { Body } from '../../objects/body'
import { Footwear } from '../../objects/footwear'
import { Gloves } from '../../objects/gloves'
import { CharacterModifier } from './character.modifier'
import { SkillPowerUp } from '../../objects/modifiers/skill.mod';
import { MasterworkWeapon } from '../../objects/weapons/masterwork';

export enum CharacterRarity {
    Default = 'Default'
}
export type sCharacter = {
    __uuid: string,
    name: string,
    level: number,
    elementTypes: ElementType[],
    rarity: CharacterRarity,
    edition: string,
    image: string,
    health: number,
    maxHealth: number,
    armor: number,
    power: number,
    strength: number,
    special: number,
    speed: number,
    luck: number,
    memory: number,
    status: sCharacterStatus,
    skills: sSkill[],
    weapon: sItem | null
    charm: sItem | null
    ring: sItem | null
    head: sItem | null
    body: sItem | null
    footwear: sItem | null
    gloves: sItem | null
    hasStaticModifiersApplied: boolean,
}
export type iCharacter = {
    // character info
    __uuid?: string,
    name?: string,
    level?: number,
    elementTypes?: List<ElementType>,
    rarity?: CharacterRarity,
    edition?: string,
    image?: string,
    // character stats
    health?: number,
    maxHealth?: number,
    armor?: number,
    power?: number,
    strength?: number,
    special?: number,
    speed?: number,
    luck?: number,
    memory?: number,
    status?: CharacterStatus,
    skills?: List<Skill>,
    weapon?: Item | null
    charm?: Item | null
    ring?: Item | null
    head?: Item | null
    body?: Item | null
    footwear?: Item | null
    gloves?: Item | null
    hasStaticModifiersApplied?: boolean,
}
export const defaultCharacter: iCharacter = {
    name: '',
    level: 0,
    elementTypes: List<ElementType>(),
    rarity: CharacterRarity.Default,
    edition: 'alpha',
    image: '',

    health: 0,
    maxHealth: 0,
    armor: 0,
    power: 0,
    strength: 0,
    special: 0,
    speed: 0,
    luck: 0,
    memory: 0,

    status: new CharacterStatus(),
    skills: List<Skill>(),
    weapon: null,
    charm: null,
    ring: null,
    head: null,
    body: null,
    footwear: null,
    gloves: null,

    hasStaticModifiersApplied: false,
}

export class Character extends AppRecord implements iCharacter {
    public readonly name: string
    public readonly level: number
    public readonly elementTypes: List<ElementType>
    public readonly rarity: CharacterRarity
    public readonly edition: string
    public readonly image: string

    public readonly health: number
    public readonly maxHealth: number

    public readonly armor: number
    public readonly power: number
    public readonly strength: number
    public readonly special: number
    public readonly speed: number
    public readonly luck: number
    public readonly memory: number

    public readonly status: CharacterStatus
    public readonly skills: List<Skill>

    public readonly weapon: Item | null
    public readonly charm: Item | null
    public readonly ring: Item | null
    public readonly head: Item | null
    public readonly body: Item | null
    public readonly footwear: Item | null
    public readonly gloves: Item | null

    public readonly hasStaticModifiersApplied: boolean

    get staticModifiers(): List<Modifier> {
        return List<Modifier>()
            .push(SkillPowerUp(this.special, null))
            .concat(this.weapon ? this.weapon.modifiers : null)
            .concat(this.charm ? this.charm.modifiers : null)
            .concat(this.ring ? this.ring.modifiers : null)
            .concat(this.head ? this.head.modifiers : null)
            .concat(this.body ? this.body.modifiers : null)
            .concat(this.footwear ? this.footwear.modifiers : null)
            .concat(this.gloves ? this.gloves.modifiers : null)
    }

    get items(): List<Item> {
        return List.of<Item>(
            this.weapon, this.charm, this.ring, this.head, this.body, this.footwear, this.gloves
        )
    }

    constructor(args?: iCharacter) {
        args ?
            super({ ...defaultCharacter, ...args } as iCharacter) :
            super(defaultCharacter)
    }

    with(values: iCharacter): Character {
        return super.with(values) as Character
    }

    serialize(): sCharacter {
        return {
            __uuid: this.__uuid,
            name: this.name,
            level: this.level,
            elementTypes: this.elementTypes.toArray(),
            rarity: this.rarity,
            edition: this.edition,
            image: this.image,
            health: this.health,
            maxHealth: this.maxHealth,
            armor: this.armor,
            power: this.power,
            strength: this.strength,
            special: this.special,
            speed: this.speed,
            luck: this.luck,
            memory: this.memory,
            status: this.status.serialize(),
            skills: this.skills.map(skill => skill.serialize()).toArray(),
            weapon: this.weapon ? this.weapon.serialize() : null,
            charm: this.charm ? this.charm.serialize() : null,
            ring: this.ring ? this.ring.serialize() : null,
            head: this.head ? this.head.serialize() : null,
            body: this.body ? this.body.serialize() : null,
            footwear: this.footwear ? this.footwear.serialize() : null,
            gloves: this.gloves ? this.gloves.serialize() : null,
            hasStaticModifiersApplied: this.hasStaticModifiersApplied,
        }
    }

    static deserialize(sCharacter: sCharacter): Character {
        return new Character({
            __uuid: sCharacter.__uuid,
            name: sCharacter.name,
            level: sCharacter.level,
            elementTypes: List<ElementType>(sCharacter.elementTypes),
            rarity: sCharacter.rarity,
            edition: sCharacter.edition,
            image: sCharacter.image,
            health: sCharacter.health,
            maxHealth: sCharacter.maxHealth,
            armor: sCharacter.armor,
            power: sCharacter.power,
            strength: sCharacter.strength,
            special: sCharacter.special,
            speed: sCharacter.speed,
            luck: sCharacter.luck,
            memory: sCharacter.memory,
            status: CharacterStatus.deserialize(sCharacter.status),
            skills: List<Skill>(sCharacter.skills.map(sSkill => Skill.deserialize(sSkill))),
            weapon: sCharacter.weapon ? Item.deserialize(sCharacter.weapon) : null,
            charm: sCharacter.charm ? Item.deserialize(sCharacter.charm) : null,
            ring: sCharacter.ring ? Item.deserialize(sCharacter.ring) : null,
            head: sCharacter.head ? Item.deserialize(sCharacter.head) : null,
            body: sCharacter.body ? Item.deserialize(sCharacter.body) : null,
            footwear: sCharacter.footwear ? Item.deserialize(sCharacter.footwear) : null,
            gloves: sCharacter.gloves ? Item.deserialize(sCharacter.gloves) : null,
            hasStaticModifiersApplied: sCharacter.hasStaticModifiersApplied,
        })
    }

    setHealth(value: number, withMaxHealth: boolean = false): Character {
        let _this = this.with({})
        if (withMaxHealth) _this =
            _this.with({ maxHealth: value })
        _this = _this.with({ health: value })
        if (_this.health > _this.maxHealth)
            _this = _this.with({ health: _this.maxHealth })
        if (_this.health < 0)
            _this = _this.with({ health: 0 })
        return _this
    }

    equipWeapon(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Weapon) {
            return this.with({
                weapon: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name
                })
            })
        } else {
            throw new Error('Only weapons can be equipped in the weapons slot')
        }
    }

    equipCharm(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Charm) {
            return this.with({
                charm: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name
                })
            })
        } else {
            throw new Error('Only charms can be equipped in the charms slot')
        }
    }

    equipRing(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Ring) {
            return this.with({
                ring: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name
                })
            })
        } else {
            throw new Error('Only rings can be equipped in the rings slot')
        }
    }

    equipHead(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Head) {
            return this.with({
                head: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name
                })
            })
        } else {
            throw new Error('Only head items can be equipped in the head slot')
        }
    }

    equipBody(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Body) {
            return this.with({
                body: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name
                })
            })
        } else {
            throw new Error('Only body items can be equipped in the body slot')
        }
    }

    equipFootwear(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Footwear) {
            return this.with({
                footwear: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name,
                })
            })
        } else {
            throw new Error('Only footwear items can be equipped in the footwear slot')
        }
    }

    equipGloves(item: Item): Character {
        if (item.type === ItemType.Equipable && item.subType === ItemSubType.Gloves) {
            return this.with({
                gloves: item.with({
                    parentId: this.__uuid,
                    parentType: this.__name,
                })
            })
        } else {
            throw new Error('Only gloves items can be equipped in the gloves slot')
        }
    }

    equipItem(item: Item): Character {
        if (item.type === ItemType.Equipable) {
            let _this = this.with({})
            if (item.subType === ItemSubType.Weapon) _this = this.equipWeapon(item)
            if (item.subType === ItemSubType.Charm) _this = this.equipCharm(item)
            if (item.subType === ItemSubType.Ring) _this = this.equipRing(item)
            if (item.subType === ItemSubType.Head) _this = this.equipHead(item)
            if (item.subType === ItemSubType.Body) _this = this.equipBody(item)
            if (item.subType === ItemSubType.Footwear) _this = this.equipFootwear(item)
            if (item.subType === ItemSubType.Gloves) _this = this.equipGloves(item)
            return _this
        } else {
            throw new Error(`Item must be equipable: ${item.type}`)
        }
    }

    removeItem(itemSubType: ItemSubType) {
        switch (itemSubType) {
            case ItemSubType.Weapon: return this.with({ weapon: null })
            case ItemSubType.Charm: return this.with({ charm: null })
            case ItemSubType.Ring: return this.with({ ring: null })
            case ItemSubType.Head: return this.with({ head: null })
            case ItemSubType.Body: return this.with({ body: null })
            case ItemSubType.Footwear: return this.with({ footwear: null })
            case ItemSubType.Gloves: return this.with({ gloves: null })
            default: return this
        }
    }

    getItem(itemSubType: ItemSubType): Item {
        switch (itemSubType) {
            case ItemSubType.Weapon: return this.weapon
            case ItemSubType.Charm: return this.charm
            case ItemSubType.Ring: return this.ring
            case ItemSubType.Head: return this.head
            case ItemSubType.Body: return this.body
            case ItemSubType.Footwear: return this.footwear
            case ItemSubType.Gloves: return this.gloves
        }
    }

    applyModifier(mod: Modifier): Character {
        if (!mod) return this;
        let returnValue = this.with({})
        mod.mods.forEach(m => {
            returnValue = CharacterModifier(returnValue, m)
        })
        return returnValue
    }

    withStaticModifiers(): Character {
        let _this = this.with({})
        if (_this.hasStaticModifiersApplied) return _this;
        this.staticModifiers.forEach(mod => _this = _this.applyModifier(mod))
        if (_this.strength < 0) _this = _this.with({ ..._this, strength: 0 })
        if (_this.special < 0) _this = _this.with({ ..._this, special: 0 })
        if (_this.speed < 0) _this = _this.with({ ..._this, speed: 0 })
        return _this.with({ hasStaticModifiersApplied: true })
    }

    getArmor(): number {
        let armor = this.armor
        this.items.forEach(item => {
            armor += item ? item.stats.armor : 0
        })
        return armor
    }

    withRandomItems() {
        return this
            .equipWeapon(MasterworkWeapon(100))
            .equipCharm(Charm(100))
            .equipRing(Ring(100))
            .equipHead(Head(100))
            .equipBody(Body(100))
            .equipFootwear(Footwear(100))
            .equipGloves(Gloves(100))
    }
}