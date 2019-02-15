import { List, Map } from 'immutable'
import { Party } from '../party'
import { AppRecord } from '..'
import { string } from 'prop-types';

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

export type iBattleTurn  = {
    phase: BattleTurnPhase,
    moves: Map<string, iBattleMove>,
}

const defaultBattleTurn: iBattleTurn = {
    phase: BattleTurnPhase.Upkeep,
    moves: Map<string, iBattleMove>(),
}

export class BattleTurn extends AppRecord implements iBattleTurn {
    public readonly phase: BattleTurnPhase
    public readonly moves: Map<string, iBattleMove>

    constructor(args?: iBattleTurn) {
        args ?
            super({ ...defaultBattleTurn, ...args } as iBattleTurn) :
            super(defaultBattleTurn)
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