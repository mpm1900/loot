import { List, Map } from 'immutable'
import { Party } from '../party'
import { AppRecord } from '..'
import { Skill, SkillPriority } from '../skill'
import { Character } from '../character'
import { RandFloat } from '../random'
import { getPower } from './utils'
import { TriggerType, Trigger } from '../trigger'
import { ArmorDamage, Damage, ElementalDamage } from '../../objects/modifiers/health.mod';

enum BattleTurnPhase {
    Running,
    Waiting,
}

enum BattleStaticSkillType {
    WeaponAttack,
    SwapCharacters,
}

type BattleStaticSkill = {
    type: BattleStaticSkillType,
    value: any,
    priority?: SkillPriority,
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
    phase: BattleTurnPhase.Waiting,
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
                    priority: SkillPriority.Default,
                    value: null,
                })
            })
        }
        if (skillId === 'swap') {
            return this.with({
                skillIds: this.skillIds.set(userId, {
                    type: BattleStaticSkillType.SwapCharacters,
                    priority: SkillPriority.Plus3,
                    value: characterId,
                })
            })
        }
        // check for static skills
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
        })
        speeds = speeds.sort((a, b) => b.speed - a.speed)
        speeds.map(s => s.userId).forEach((userId, index) => {
            parties.forEach((party, userId) => {
                const activeCharacter = party.activeCharacter.withStaticModifiers()
                activeCharacters = activeCharacters.set(userId, activeCharacter)
            })
            const otherUserId = index === 0 ? speeds.get(1).userId : speeds.get(0).userId
            const source = activeCharacters.get(userId)
            const target = activeCharacters.get(otherUserId)
            if (source.health <= 0 || target.health <= 0) return

            if (this.skillIds.get(userId) && (this.skillIds.get(userId) as BattleStaticSkill).type === BattleStaticSkillType.WeaponAttack) {
                parties = this.executeWeaponAttack(parties, userId, otherUserId)
            }
            if (this.skillIds.get(userId) && (this.skillIds.get(userId) as BattleStaticSkill).type === BattleStaticSkillType.SwapCharacters) {
                parties = parties.set(userId, parties.get(userId).with({
                    activeCharacterId: (this.skillIds.get(userId) as BattleStaticSkill).value
                }))
            }
        })
        return parties
    }
    public executeWeaponAttack(parties: Map<string, Party>, userId: string, otherUserId: string): Map<string, Party> {
        const source = parties.get(userId).activeCharacter
        const target = parties.get(otherUserId).activeCharacter
        const weapon = source.weapon
        const power = weapon ? getPower(weapon) : 0
        if (power > 0) {
            const newTarget = target
                .applyModifier(ArmorDamage(power))
                .applyModifier(ElementalDamage(weapon.elements, target.elementTypes))

            parties = parties.set(otherUserId, parties.get(otherUserId).updateCharacter(newTarget.__uuid, newTarget))

            weapon.triggers
                .filter(trigger => trigger.type === TriggerType.OnHit)
                .forEach(trigger => {
                    parties = this.executeTrigger(parties, trigger, userId, otherUserId)
                })
        }

        return parties
    }

    public executeTrigger(parties: Map<string, Party>, trigger: Trigger, userId: string, otherUserId: string): Map<string, Party> {
        const roll = RandFloat(0, 1)
        const source = parties.get(userId).activeCharacter
        const target = parties.get(otherUserId).activeCharacter
        if (roll <= trigger.chance) {
            trigger.modifiers.forEach(mod => {
                parties = parties.set(otherUserId, parties.get(otherUserId)
                    .updateCharacter(
                        target.__uuid,
                        parties.get(otherUserId).characters.find(c => c.__uuid === target.__uuid).applyModifier(mod)
                    )
                )
            })
            trigger.targetModifiers.forEach(mod => {
                parties = parties.set(userId, parties.get(userId)
                    .updateCharacter(
                        source.__uuid,
                        parties.get(userId).characters.find(c => c.__uuid === source.__uuid).applyModifier(mod)
                    )
                )
            })
        }
        return parties
    }
    public updateCooldowns(parties: List<Party>): List<Party> {
        return parties
    }
    public applyStatusModifiers(parties: List<Party>): List<Party> {
        return parties
    }
    public checkActiveCharacters(parties: Map<string, Party>): List<string> {
        let usersToRequest = List<string>()
        parties.keySeq().forEach(userId => {
            const party = parties.get(userId)
            if (party.activeCharacter.withStaticModifiers().health <= 0) {
                usersToRequest = usersToRequest.push(userId)
            }
        })
        return usersToRequest
    }
    public checkParties(): boolean {
        return true
    }
    public requestSwap(parties: List<Party>): List<Party> {
        return parties
    }
    public next() {
        let phase = BattleTurnPhase.Waiting
        if (this.phase === BattleTurnPhase.Waiting)
            phase = BattleTurnPhase.Running
        return this.with({ phase })
    }
}