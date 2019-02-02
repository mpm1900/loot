import { AppRecord } from '.'

export type sGuage = {
    min: number,
    max: number,
    value: number,
}
export type iGuage = {
    min?: number,
    max?: number,
    value?: number,
}
const defaultGuage: iGuage = {
    min: 0,
    max: 100,
    value: 0,
}
export class Guage extends AppRecord implements iGuage {
    public readonly min: number
    public readonly max: number
    public readonly value: number

    constructor(args?: iGuage) {
        args ?
            super({ ...defaultGuage, ...args } as iGuage) :
            super(defaultGuage)
    }

    with(values: iGuage): Guage {
        return super.with(values) as Guage
    }

    serialize(): sGuage {
        return {
            min: this.min,
            max: this.max,
            value: this.value,
        }
    }

    static deserialize(sGuage: sGuage): Guage {
        return new Guage({
            min: sGuage.min,
            max: sGuage.max,
            value: sGuage.value,
        })
    }

    public check(): boolean {
        return this.value === this.max
    }

    public checkMin(): boolean {
        return this.value === this.min
    }

    public reset(overflow = false): Guage {
        const value = overflow ?
            this.value - this.max :
            this.min

        return this.with({
            value: (value < this.min) ? this.min : value
        })
    }

    public decrement(amount = 1) {
        return this.with({
            value: this.value - amount
        })
    }

    public increment(amount = 1) {
        return this.with({
            value: this.value + amount
        })
    }

    public reverse(): Guage {
        return this.with({
            min: this.max,
            max: this.min
        })
    }
}

