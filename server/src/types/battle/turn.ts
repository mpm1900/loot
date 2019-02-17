import { List, Map } from 'immutable'
import { Party } from '../party'
import { AppRecord } from '..'
import { Skill } from '../skill'

export type iBattleMove  = {
    type: iBattleMoveType
    skillId: string,
    characterId: string,
    itemId: number,
}

enum iBattleMoveType {
    Fight,
    Skill,
    Swap,
    Item,
}

enum BattleTurnPhase {
    Upkeep,
    Waiting,
    Main,
}

export type sBattleTurn = {
    phase: BattleTurnPhase,
    moves: any,
}

export type iBattleTurn  = {
    phase: BattleTurnPhase,
    moves: Map<string, Skill>,
}

const defaultBattleTurn: iBattleTurn = {
    phase: BattleTurnPhase.Upkeep,
    moves: Map<string, Skill>(),
}

export class BattleTurn extends AppRecord implements iBattleTurn {
    public readonly phase: BattleTurnPhase
    public readonly moves: Map<string, Skill>

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
            moves: Map<string, Skill>(sBattleTurn.moves),
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
        return this
    }
    public addMove(userId: string, parties: Map<string, Party>, skillId: string) {
        const party = parties.find(party => party.userId === userId)
        if (!party) return this
        const skill = party.activeCharacter.skills.find(skill => skill.__uuid === skillId)
        if (!skill) return this
        return this.with({
            moves: this.moves.set(userId, skill)
        })
    }
    public applyPhysicalDamage(parties: List<Party>): List<Party> {
        return parties
    }
    public applyElementalDamage(parties: List<Party>): List<Party> {
        return parties
    }
    public applyStatusDamage(parties: List<Party>): List<Party> {
        return parties
    }
    public addStatusModifiers(parties: List<Party>): List<Party> {
        return parties
    }
    public addStaticModifiers(parties: List<Party>): List<Party> {
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
    public checkUsers(): boolean {
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