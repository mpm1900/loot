import { Character } from "../../types/character";
import { ElementType } from "../../types/element";


export const TypeColors = {
    [ElementType.Dark]: 'rgb(139, 106, 180)',
    [ElementType.Fire]: '#c62121',
    [ElementType.Thunder]: 'rgb(239, 176, 58)',
    [ElementType.Water]: '#3A5894',
    [ElementType.Grass]: '#4a6741',
    [ElementType.Earth]: '#966532',
    [ElementType.Light]: '#CAB298',
    [ElementType.Ice]: '#87BCE5',
    [ElementType.Dragon]: '#B2375C',
}

export const getTypeGradient = (character: Character) => {
    return (character.elementTypes.size > 1) ? 
        character.elementTypes.map(type => TypeColors[type]).toJS(): 
        TypeColors[character.elementTypes.get(0)]
}

export const getTypeGradientCSS = (character: Character) => {
    const gradient = getTypeGradient(character)
    if (character.elementTypes.size > 1) return `linear-gradient(135deg, ${gradient})`
    return gradient
}