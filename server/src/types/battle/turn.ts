import { List, Map } from 'immutable'
import { Party } from '../party'
import { AppRecord } from '..'
import { Skill } from '../skill'
import { Character } from '../character'
import { Item } from '../item';
import { RandFloat } from '../random';
import { calculateArmorDamage } from './utils';

enum BattleTurnPhase {
    Upkeep,
    Waiting,
    Main,
}

enum BattleStaticSkillType {
    WeaponAttack,
    SwapCharacters,
}

type BattleStaticSkill = {
    type: BattleStaticSkillType,
    value: any
}

export type sBattleTurn = {
    phase: BattleTurnPhase,
    skillIds: any,
}

export type iBattleTurn  = {
    phase: BattleTurnPhase,
    skillIds: Map<string, string | BattleStaticSkill>,
}

const defaultBattleTurn: iBattleTurn = {
    phase: BattleTurnPhase.Upkeep,
    skillIds: Map<string, string | BattleStaticSkill>(),
}

export class BattleTurn extends AppRecord implements iBattleTurn {
    public readonly phase: BattleTurnPhase
    public readonly skillIds: Map<string, string | BattleStaticSkill>

    constructor(args?: iBattleTurn) {
        args ?
            super({ ...defaultBattleTurn, ...args } as iBattleTurn) :
            super(defaultBattleTurn)
    }

    public serialize(): sBattleTurn {
        return {
            phase: this.phase,
            skillIds: this.skillIds.toJS(),
        }
    }

    public static deserialize(sBattleTurn: sBattleTurn): BattleTurn {
        return new BattleTurn({
            phase: sBattleTurn.phase,
            skillIds: Map<string, string | BattleStaticSkill>(sBattleTurn.skillIds),
        })
    }

    public decrementCooldowns(parties: List<Party>): List<Party> {
        return parties
    }
    public decrementStaticModifiers(parties: List<Party>): List<Party> {
        return parties
    }
    public decrementStatusModifiers(parties: List<Party>): List<Party> {
        return parties
    }
    public resetSkills(): BattleTurn {
        return this.with({
            skillIds: Map<string, Skill>(),
        })
    }
    public addSkill(userId: string, parties: Map<string, Party>, skillId: string, characterId: string = null): BattleTurn {
        console.log('add skill', characterId)
        const party = parties.find(party => party.userId === userId)
        if (!party || !party.activeCharacter) return this

        if (skillId === 'weapon') {
            return this.with({
                skillIds: this.skillIds.set(userId, {
                    type: BattleStaticSkillType.WeaponAttack,
                    value: null,
                })
            })
        }
        if (skillId === 'swap') {
            return this.with({
                skillIds: this.skillIds.set(userId, {
                    type: BattleStaticSkillType.SwapCharacters,
                    value: characterId,
                })
            })
        }
        // check for static skills
            // swap
            // inspect?
            // more?

        const skill = party.activeCharacter.skills.find(skill => skill.__uuid === skillId)
        if (!skill) return this
        return this.with({
            skillIds: this.skillIds.set(userId, skillId)
        })
    }
    public executeSkills(parties: Map<string, Party>): Map<string, Party> {
        let speeds: List<any> = List()
        let activeCharacters: Map<string, Character> = Map<string, Character>()
        parties.forEach((party, userId) => {
            const activeCharacter = party.activeCharacter.withStaticModifiers()
            speeds = speeds.push({ userId, speed: activeCharacter.speed })
            activeCharacters = activeCharacters.set(userId, activeCharacter)
        })
        speeds = speeds.sort((a, b) => {
            return b.speed - a.speed
        })
        speeds.map(s => s.userId).forEach((userId, index) => {
            parties.forEach((party, userId) => {
                const activeCharacter = party.activeCharacter.withStaticModifiers()
                activeCharacters = activeCharacters.set(userId, activeCharacter)
            })
            const otherUserId = index === 0 ?
                speeds.get(1).userId :
                speeds.get(0).userId
            const source = activeCharacters.get(userId)
            const target = activeCharacters.get(otherUserId)
            if (source.health <= 0) return
            console.log('source health:', source.health)

            if (this.skillIds.get(userId) && (this.skillIds.get(userId) as BattleStaticSkill).type === BattleStaticSkillType.WeaponAttack) {
                const getPower = (weapon: Item) => {
                    if (!weapon || !weapon.stats) return 0
                    const accRoll = RandFloat(0, 1)
                    const affRoll = RandFloat(0, 1)
                    if (accRoll > weapon.stats.accuracy) {
                        console.log('MISSED', weapon.stats.accuracy, accRoll)
                        return 0
                    }
                    if (affRoll < weapon.stats.affinity) return weapon.stats.power * weapon.stats.criticalRatio
                    return weapon.stats.power
                }

                const power = Math.round(source.weapon ? getPower(source.weapon) : 0)
                const armor = target.getArmor()
                const armorDamage = calculateArmorDamage(power, armor)
                const healthDamage = power - armorDamage
                console.log(source.name)
                console.log('power', power)
                console.log('armor', armor)
                console.log('armorDamage', armorDamage)
                console.log('healthDamage', healthDamage)
                parties = parties.set(otherUserId, parties.get(otherUserId).updateCharacterWith(target.__uuid, {
                    armor: parties.get(otherUserId).activeCharacter.armor - armorDamage,
                    health: parties.get(otherUserId).activeCharacter.health - healthDamage
                }))
            }

            if (this.skillIds.get(userId) && (this.skillIds.get(userId) as BattleStaticSkill).type === BattleStaticSkillType.SwapCharacters) {
                parties = parties.set(userId, parties.get(userId).with({
                    activeCharacterId: (this.skillIds.get(userId) as BattleStaticSkill).value
                }))
            }
        })
        return parties
    }
    public updateCooldowns(parties: List<Party>): List<Party> {
        return parties
    }
    public applyStatusModifiers(parties: List<Party>): List<Party> {
        return parties
    }
    public checkActiveCharacters(parties: List<Party>): boolean {
        return true
    }
    public checkParties(): boolean {
        return true
    }
    public requestSwap(parties: List<Party>): List<Party> {
        return parties
    }
    public next() {
        let phase = BattleTurnPhase.Upkeep
        if (this.phase === BattleTurnPhase.Upkeep)
            phase = BattleTurnPhase.Waiting
        if (this.phase === BattleTurnPhase.Waiting)
            phase = BattleTurnPhase.Main

        return this.with({ phase })
    }
}