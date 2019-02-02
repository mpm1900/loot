import { AppRecord } from '..';
import { Character, iCharacter, sCharacter } from '../character';
import { List } from 'immutable';
import { Item, sItem, ItemSubType } from '../item';

export type sParty = {
    characters: sCharacter[],
    bench: sCharacter[],
    activeCharacterId: string,
    characterLimit: number,
    items: sItem[],
}
export type iParty = {
    characters?: List<Character>,
    bench?: List<Character>,
    activeCharacterId?: string,
    characterLimit?: number,
    items?: List<Item>,
}
const defaultParty: iParty = {
    characters: List<Character>(),
    bench: List<Character>(),
    activeCharacterId: '',
    characterLimit: 5,
    items: List<Item>(),
}
export class Party extends AppRecord implements iParty {

    // attributes and getters
    public readonly characters: List<Character>
    public readonly bench: List<Character>
    public readonly activeCharacterId: string
    public readonly characterLimit: number
    public readonly items: List<Item>

    get activeCharacter(): Character {
        return this.characters.find(character => character.__uuid === this.activeCharacterId)
    }

    // core record methods
    constructor(args?: iParty) {
        args ?
            super({ ...defaultParty, ...args } as iParty) :
            super(defaultParty)
    }
    with(values: iParty): Party {
        return super.with(values) as Party
    }

    serialize(): sParty {
        return {
            characters: this.characters.map(character => character.serialize()).toArray(),
            bench: this.bench.map(character => character.serialize()).toArray(),
            activeCharacterId: this.activeCharacterId,
            characterLimit: this.characterLimit,
            items: this.items.map(item => item.serialize()).toArray()
        }
    }

    static deserialize(sParty: sParty): Party {
        return new Party({
            characters: List<Character>(sParty.characters.map(sCharacter => Character.deserialize(sCharacter))),
            bench: List<Character>(sParty.bench.map(sCharacter => Character.deserialize(sCharacter))),
            activeCharacterId: sParty.activeCharacterId,
            characterLimit: sParty.characterLimit,
            items: List<Item>(sParty.items.map(sItem => Item.deserialize(sItem)))
        })
    }

    // argument getters
    getCharacterById(characterId: string) {
        return this.characters.find(character => character.__uuid === characterId)
    }
    getBenchCharacterById(characterId: string) {
        return this.bench.find(character => character.__uuid === characterId)
    }
    getItemById(itemId: string) {
        return this.items.find(item => item.__uuid === itemId)
    }

    // modify characters/bench
    addCharacter(character: Character) {
        if (this.characters.size === this.characterLimit) {
            return this.addCharacterToBench(character)
        }
        return this.with({
            characters: this.characters.push(character)
        })
    }
    removeCharacter(characterId: string): Party {
        return this.with({
            characters: this.characters.filter(character => character.__uuid !== characterId)
        })
    }
    addCharacterToBench(character: Character) {
        return this.with({
            bench: this.bench.push(character)
        })
    }
    updateCharacter(index: number, character: Character) {
        return this.with({
            characters: this.characters.update(index, _ => character)
        })
    }
    removeCharacterItem(index: number, itemSubType: ItemSubType) {
        return this.with({
            characters: this.characters.update(index, character => character.removeItem(itemSubType))
        })
    }
    swapCharacters(characterIndex: number, benchIndex: number) {
        if (characterIndex >= this.characters.size) throw new Error('Swap character index out of range.')
        if (benchIndex >= this.bench.size) throw new Error('Swap bench index out of range')
        const a = this.characters.get(characterIndex)
        const b = this.bench.get(benchIndex)
        return this.with({
            characters: this.characters.set(characterIndex, b),
            bench: this.bench.set(benchIndex, a)
        })
    }

    // modify items
    addItem(item: Item) {
        return this.with({
            items: (item.parentIndex ? this.items.insert(item.parentIndex, item) : this.items.unshift(item))
                .map((item, index) => item.with({ parentIndex: index }))
        })
    }
    removeItem(itemId: string) {
        return this.with({
            items: this.items
                .filter(item => item.__uuid !== itemId)
                .map((item, index) => item.with({ parentIndex: index }))
        })
    }
}