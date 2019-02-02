import { List } from "immutable";
import { Party } from "../party";

interface iBattleState {
    users: List<iBattleUser>,
    turn: iBattleTurn,
    turnCount: number,
    log: BattleLog,
}

interface iBattleUser {
    name: string,
    connected: boolean,
    waiting: boolean,
    party: Party
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
        // OnHit modifiers applied
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
interface iBattleTurn {
    phase: BattleTurnPhase,
    moves: Map<string, iBattleMove>
    // then loooottttts over methods for everything outlined 
    // in the phases, data will be given to this by the parent
    decrementCooldowns: (users: List<iBattleUser>) => List<iBattleUser>
    decrementStaticModifiers: (users: List<iBattleUser>) => List<iBattleUser>
    decrementStatusModifiers: (users: List<iBattleUser>) => List<iBattleUser>
    resetMoves: () => iBattleTurn
    // choose move methods, not sure how I'm going to do this one...
    applyPhysicalDamage: (users: List<iBattleUser>) => List<iBattleUser>
    applyElementalDamage: (users: List<iBattleUser>) => List<iBattleUser>
    applyStatusDamage: (users: List<iBattleUser>) => List<iBattleUser>
    addStatusModifiers: (users: List<iBattleUser>) => List<iBattleUser>
    addStaticModifiers: (users: List<iBattleUser>) => List<iBattleUser>
    // on hit modifiers
    updateCooldowns: (users: List<iBattleUser>) => List<iBattleUser>
    applyStatusModifiers: (users: List<iBattleUser>) => List<iBattleUser>
    checkActiveCharacters: (users: List<iBattleUser>) => boolean
    checkUsers: (users: List<iBattleUser>) => boolean
    requestSwap: (users: List<iBattleUser>) => List<iBattleUser>
    // to next phase
    next: () => iBattleTurn,
}

interface iBattleMove {
    type: iBattleMoveType
    priority: number,
    skillIndex: number,
    benchIndex: number,
    itemIndex: number,
}

enum iBattleMoveType {
    Fight,
    Swap,
    Item,
}

interface BattleLog {

}