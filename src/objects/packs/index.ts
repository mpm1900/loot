import { Pack, PackContents, PackContentsType } from '../../types/pack'
import { List } from 'immutable';
import { CharacterRarity } from '../../types/character';


export const BasicCharacterPack = (level = 100) => new Pack({
    contents: List.of<PackContents>({
        type: PackContentsType.Character,
        rarity: CharacterRarity.Default,
        level
    }, {
        type: PackContentsType.Character,
        rarity: CharacterRarity.Default,
        level
    }, {
        type: PackContentsType.Character,
        rarity: CharacterRarity.Default,
        level
    }, {
        type: PackContentsType.Character,
        rarity: CharacterRarity.Default,
        level
    })
})