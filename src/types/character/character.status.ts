import { Guage, sGuage } from '../guage'
import { AppRecord } from '..'

export type sCharacterStatus = {
    poison: sGuage,
    sleep: sGuage,
    paralysis: sGuage,
    burn: sGuage,
}
export type iCharacterStatus = {
    poison?: Guage,
    sleep?: Guage,
    paralysis?: Guage,
    burn?: Guage,
}
const defaultCharacterStatus: iCharacterStatus = {
    poison: new Guage(),
    sleep: new Guage(),
    paralysis: new Guage(),
    burn: new Guage(),
}
export class CharacterStatus extends AppRecord implements iCharacterStatus {

    public readonly poison: Guage
    public readonly sleep: Guage
    public readonly paralysis: Guage
    public readonly burn: Guage

    constructor(args?: iCharacterStatus) {
        args ?
            super({ ...defaultCharacterStatus, ...args } as iCharacterStatus) :
            super(defaultCharacterStatus)
    }

    with(values: iCharacterStatus): CharacterStatus {
        return super.with(values) as CharacterStatus
    }

    serialize(): sCharacterStatus {
        return {
            poison: this.poison.serialize(),
            sleep: this.sleep.serialize(),
            paralysis: this.paralysis.serialize(),
            burn: this.burn.serialize(),
        }
    }

    static deserialize(sCharacterStatus: sCharacterStatus): CharacterStatus {
        return new CharacterStatus({
            poison: Guage.deserialize(sCharacterStatus.poison),
            sleep: Guage.deserialize(sCharacterStatus.sleep),
            paralysis: Guage.deserialize(sCharacterStatus.paralysis),
            burn: Guage.deserialize(sCharacterStatus.burn),
        })
    }
}