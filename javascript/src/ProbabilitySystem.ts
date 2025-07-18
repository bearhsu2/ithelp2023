import {Bet} from "./Bet";
import {SpinResult} from "./SpinResult";
import {SlotGame} from "./SlotGame";
import {DBCTool} from "./DBCTool";
import {Memento} from "./Memento";

export class ProbabilitySystem {

    private baseGame: SlotGame;
    private freeGame: SlotGame;

    private freeGameCount: number = 0;
    private maxBet: Bet;


    private constructor(baseGame: SlotGame, freeGame: SlotGame) {

        this.baseGame = baseGame;
        this.freeGame = freeGame;

        this.maxBet = this.freeGame.getMaxBet();

    }


    spin(bet: Bet): SpinResult {

        DBCTool.require((): boolean => this.getNextGameType() == "BASE_GAME", "Invalid game mode.");

        const {
            odd,
            screen,
            freeGameIncrement
        } = this.baseGame.doSpinFlow(bet);
        this.freeGameCount += freeGameIncrement;

        return SpinResult.of(odd, screen, this.getNextGameType());
    }

    spinFree(): SpinResult {

        const {
            odd,
            screen,
            freeGameIncrement
        } = this.freeGame.doSpinFlow(this.maxBet);
        this.freeGameCount += freeGameIncrement;

        this.freeGameCount--;
        return SpinResult.of(odd, screen, this.getNextGameType());

    }

    getScreen() {
        return this.getNextGameType() === "BASE_GAME"
            ? this.baseGame.getScreen()
            : this.freeGame.getScreen();
    }

    getNextGameType(): string {
        return this.freeGameCount > 0 ? "FREE_GAME" : "BASE_GAME";
    }

    static create(baseGame: SlotGame, freeGame: SlotGame): ProbabilitySystem {
        return new ProbabilitySystem(baseGame, freeGame);
    }



    createMemento(): Memento {
        return new Memento(
            this.baseGame.getReelsIndexes(),
            this.freeGame.getReelsIndexes(),
            this.freeGameCount);
    }

    restore(memento: Memento) {
        this.baseGame.rollReels(memento.getBaseGameReelsIndexes());
        this.freeGame.rollReels(memento.getFreeGameReelsIndexes());
        this.freeGameCount = memento.getFreeGameCount();

    }
}
