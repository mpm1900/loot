import { List } from 'immutable'
import { Party } from '../party'
import { AppRecord } from '..';

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
    // Cooldowns decremented
    // Static/Status modifers decremented/removed
    // Reset turn moves
    Upkeep,

    // Each Player Chooses Their Move
        // Fight (choose Skill or Weapon Attack)
        // Use consumable Item
        // Swap active character
        // ??? some other option maybe
    ChooseMove,

    // Damage Phases
        // Damage applied (Physical and Special/Elemental)
        // Status damage applied
            // Status modifiers added
        // OnHit triggers applied
        // Cooldowns Updated

    // +2 Priority
    Priority5,
    // +1 Priority
    Priority4,
    // Default Priority
    Priority3,
    // -1 Priority
    Priority2,
    // -2 Priority
    Priority1,

    // Status modifiers applied
    // If a character died, prompt for the next
    // If a user has no characters, the battle is over
    CleanUp_start,
    CleanUp_request,
    CleanUp_done,
    Done,
}

export type iBattleTurn  = {
    phase: BattleTurnPhase,
    moves: Map<string, iBattleMove>
    // then loooottttts over methods for everything outlined
    // in the phases, data will be given to this by the parent
    decrementCooldowns: (parties: List<Party>) => List<Party>
    decrementStaticModifiers: (parties: List<Party>) => List<Party>
    decrementStatusModifiers: (parties: List<Party>) => List<Party>
    resetMoves: () => iBattleTurn
    // choose move methods, not sure how I'm going to do this one...
    applyPhysicalDamage: (parties: List<Party>) => List<Party>
    applyElementalDamage: (parties: List<Party>) => List<Party>
    applyStatusDamage: (parties: List<Party>) => List<Party>
    addStatusModifiers: (parties: List<Party>) => List<Party>
    addStaticModifiers: (parties: List<Party>) => List<Party>
    // on hit modifiers
    updateCooldowns: (parties: List<Party>) => List<Party>
    applyStatusModifiers: (parties: List<Party>) => List<Party>
    checkActiveCharacters: (parties: List<Party>) => boolean
    checkUsers: (parties: List<Party>) => boolean
    requestSwap: (parties: List<Party>) => List<Party>
    // to next phase
    next: () => iBattleTurn,
}

const defaultBattleTurn = {

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
    public checkUsers(parties: List<Party>): boolean {
        return true
    }
    public requestSwap(parties: List<Party>): List<Party> {
        return parties
    }
    public next() {
        return this
    }
}