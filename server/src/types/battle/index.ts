import { List, Map } from 'immutable'
import { Party, sParty } from '../party'
import { AppRecord } from '..';
import { BattleTurn } from './turn';

type iBattleState = {
    parties?: Map<string, Party>,
    turn?: BattleTurn,
    turnCount?: number,
    log?: BattleLog,
}

interface BattleLog {

}

const defaultBattleState = {
    parties: Map<string, Party>(),
    turn: new BattleTurn(),
    turnCount: 0,
    log: { }
}

export class BattleState extends AppRecord implements iBattleState {
    public readonly userIds: List<string>
    public readonly parties: Map<string, Party>
    public readonly turn: BattleTurn
    public readonly turnCount: number
    public readonly log: BattleLog

    constructor(args?: iBattleState) {
        args ?
            super({ ...defaultBattleState, ...args } as iBattleState) :
            super(defaultBattleState)
    }

    public serialize() {
        return {
            userIds: this.userIds.toArray(),
            parties: this.parties.map(party => party.serialize()).toArray(),
            turn: {
                phase: this.turn.phase
            },
            turnCount: this.turnCount,
            log: this.log,
        }
    }

    public static deserialize(sBattleState: any) {
        return new BattleState({
            parties: sBattleState.parties.map((sParty: sParty) => Party.deserialize(sParty)),
            turn: sBattleState.turn,
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
        return this
    }

    public cleanup(): BattleState {
        return this
    }
}