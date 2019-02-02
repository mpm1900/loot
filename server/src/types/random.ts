import { List } from 'immutable'
import { Chance } from 'chance'

export const NumberRange = (min: number, max: number): List<number> => {
    if (min > max) [min, max] = [max, min]
    return List<any>(Array(max - min).fill(null).map((_, i) => i + min))
}
export const RandInt = (min: number, max: number): number =>  {
    if (max === min) return min
    if (min > max) [min, max] = [max, min]
    return new Chance().integer({ min, max })
}
export const RandFloat = (min: number, max: number): number => {
    return new Chance().floating({ min, max, fixed: 2 })
}
export const RangeFunc = (min: number, max: number, func: (n: number) => any): any => {
    return NumberRange(min, max).map(n => func(n))
}
export const Choose = (list: List<any>, count: number, unique: boolean = true) => {
    let returnValue = List()
    while (returnValue.size < count) {
        list = list.sortBy(Math.random)
        const index = RandInt(0, list.size - 1)
        returnValue = returnValue.push(list.get(index))
        if (unique) list = list.remove(index)
    }
    return returnValue
}
export const RangeFuncChoose = (min: number, max: number, func: (n: number) => any, choose: number) => {
    return Choose(RangeFunc(min, max, func), choose);
}