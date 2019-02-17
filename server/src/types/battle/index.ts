import { List, Map } from 'immutable'
import { Party, sParty } from '../party'
import { AppRecord } from '..';
import { BattleTurn } from './turn';

type iBattleState = {
    parties?: Map<string, Party>,
    partyLimit?: number,
    turn?: BattleTurn,
    turnCount?: number,
    log?: BattleLog,
}

interface BattleLog {

}

const defaultBattleState = {
    parties: Map<string, Party>(),
    partyLimit: 2,
    turn: new BattleTurn(),
    turnCount: 0,
    log: { }
}

export class BattleState extends AppRecord implements iBattleState {
    public readonly parties: Map<string, Party>
    public readonly partyLimit: number
    public readonly turn: BattleTurn
    public readonly turnCount: number
    public readonly log: BattleLog

    constructor(args?: iBattleState) {
        args ?
            super({ ...defaultBattleState, ...args } as iBattleState) :
            super(defaultBattleState)
    }

    public serialize() {
        const parties: any = {}
        this.parties.forEach((party, userId) => {
            parties[userId] = party.serialize()
        })
        return {
            parties,
            turn: this.turn.serialize(),
            turnCount: this.turnCount,
            log: this.log,
        }
    }

    public static deserialize(sBattleState: any) {
        if (!sBattleState) return sBattleState
        let parties: Map<string, Party> = Map<string, Party>()
        Object.keys(sBattleState.parties).forEach((userId) => {
            parties = parties.set(userId, Party.deserialize(sBattleState.parties[userId]))
        })
        return new BattleState({
            parties,
            turn: BattleTurn.deserialize(sBattleState.turn),
            turnCount: sBattleState.turnCount,
            log: sBattleState.log,
        })
    }

    public upkeep(): BattleState {
        let _this = this.with({})
        _this = _this.with({ parties: _this.turn.decrementCooldowns(_this.parties) })
        _this = _this.with({ parties: _this.turn.decrementStaticModifiers(_this.parties) })
        _this = _this.with({ parties: _this.turn.decrementStatusModifiers(_this.parties) })
        _this = _this.with({ turn: _this.turn.resetMoves() })
        return _this
    }

    public main(): BattleState {
        return this.with({
            parties: this.turn.executeSkills(this.parties)
        })
    }

    public cleanup(): BattleState {
        return this
    }

    public exec(): BattleState {
        // TESTING METHOD ONLY
        return this.main().cleanup().upkeep()
    }
}