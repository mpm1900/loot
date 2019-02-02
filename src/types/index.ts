import { Map as ImmutableMap } from 'immutable'
import { v4 } from 'uuid'

export type KVPair = {
    key: string
    value: any
}

const logMutationErrors = false
export abstract class AppRecord {
    __data: ImmutableMap<any, any> = ImmutableMap<any, any>().set('__uuid', v4())
    __keys: string[]

    constructor(args?: any) {
        this.__data = this.__data.merge(args)
        this.__keys = Object.keys(args);
        this.__keys.forEach((key: string) => {
            const value = args[key]
            if (typeof (this as any)[key] === 'undefined' && typeof value !== undefined && key !== '__uuid' && key !== '__name') {
                Object.defineProperty(this, key, {
                    enumerable: false,
                    get() {
                        return this.__data.get(key)
                    },
                    set(value) {
                        if (logMutationErrors) console.error('MUTATION', this.constructor.name, key, value)
                    }
                })
            }
        })
    }

    get __uuid() {
        return this.__data.get('__uuid')
    }

    get __name() {
        return this.constructor.name
    }

    toJS(): any {
        return this.__data.toJS()
    }

    with(values: any): any {
        const _this = new (this.constructor as any)
        _this.__data = this.__data.merge(values)
        return _this
    }

    equals(otherRecord: AppRecord) {
        return typeof this === typeof otherRecord && this.__data.equals(otherRecord.__data);
    }
}