import { List, Map } from 'immutable'
import { Party } from '../party'
import { AppRecord } from '..'
import { Skill } from '../skill'

enum BattleTurnPhase {
    Upkeep,
    Waiting,
    Main,
}

enum BattleStaticSkill {
    WeaponAttack,
    SwapCharacters,
}

export type sBattleTurn = {
    phase: BattleTurnPhase,
    moves: any,
}

export type iBattleTurn  = {
    phase: BattleTurnPhase,
    moves: Map<string, Skill | BattleStaticSkill>,
}

const defaultBattleTurn: iBattleTurn = {
    phase: BattleTurnPhase.Upkeep,
    moves: Map<string, Skill | BattleStaticSkill>(),
}

export class BattleTurn extends AppRecord implements iBattleTurn {
    public readonly phase: BattleTurnPhase
    public readonly moves: Map<string, Skill | BattleStaticSkill>

    constructor(args?: iBattleTurn) {
        args ?
            super({ ...defaultBattleTurn, ...args } as iBattleTurn) :
            super(defaultBattleTurn)
    }

    public serialize(): sBattleTurn {
        return {
            phase: this.phase,
            moves: this.moves.toJS(),
        }
    }

    public static deserialize(sBattleTurn: sBattleTurn): BattleTurn {
        return new BattleTurn({
            phase: sBattleTurn.phase,
            moves: Map<string, Skill | BattleStaticSkill>(sBattleTurn.moves),
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
    public resetMoves(): BattleTurn {
        return this.with({
            moves: Map<string, Skill>(),
        })
    }
    public addMove(userId: string, parties: Map<string, Party>, skillId: string, characterId: string = null): BattleTurn {
        const party = parties.find(party => party.userId === userId)
        if (!party || !party.activeCharacter) return this

        if (skillId === 'weapon') {
            return this.with({
                moves: this.moves.set(userId, BattleStaticSkill.WeaponAttack)
            })
        }
        if (skillId === 'swap') {
            return this.with({
                moves: this.moves.set(userId, BattleStaticSkill.SwapCharacters)
            })
        }
        // check for static skills
            // swap
            // inspect?
            // more?

        const skill = party.activeCharacter.skills.find(skill => skill.__uuid === skillId)
        if (!skill) return this
        return this.with({
            moves: this.moves.set(userId, skill)
        })
    }
    public executeSkills(parties: Map<string, Party>): Map<string, Party> {
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