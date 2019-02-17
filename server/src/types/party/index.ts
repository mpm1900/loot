import { AppRecord } from '..';
import { Character, sCharacter } from '../character';
import { List } from 'immutable';
import { Item, ItemSubType } from '../item';

export type sParty = {
    userId: string,
    characters: sCharacter[],
    activeCharacterId: string,
    characterLimit: number,
}
export type iParty = {
    userId?: string,
    characters?: List<Character>,
    activeCharacterId?: string,
    characterLimit?: number,
}
const defaultParty: iParty = {
    userId: '',
    characters: List<Character>(),
    activeCharacterId: '',
    characterLimit: 6,
}
export class Party extends AppRecord implements iParty {

    // attributes and getters
    public readonly userId: string
    public readonly characters: List<Character>
    public readonly activeCharacterId: string
    public readonly characterLimit: number

    get activeCharacter(): Character {
        return this.characters.find(character => character.__uuid === this.activeCharacterId)
    }

    get characterItems(): List<Item> {
        let returnValue = List<Item>()
        this.characters.forEach(character => {
            returnValue = returnValue.concat(character.items)
        })
        return returnValue
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
            userId: this.userId,
            characters: this.characters.map(character => character.serialize()).toArray(),
            activeCharacterId: this.activeCharacterId,
            characterLimit: this.characterLimit,
        }
    }

    static deserialize(sParty: sParty): Party {
        return new Party({
            userId: sParty.userId,
            characters: List<Character>(sParty.characters.map(sCharacter => Character.deserialize(sCharacter))),
            activeCharacterId: sParty.activeCharacterId,
            characterLimit: sParty.characterLimit,
        })
    }

    // argument getters
    getCharacterById(characterId: string) {
        return this.characters.find(character => character.__uuid === characterId)
    }

    // modify characters/bench
    addCharacter(character: Character): Party {
        if (this.characters.size < this.characterLimit) {
            return this.with({
                characters: this.characters.push(character)
            })
        }
    }
    removeCharacter(characterId: string): Party {
        return this.with({
            characters: this.characters.filter(character => character.__uuid !== characterId)
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
}