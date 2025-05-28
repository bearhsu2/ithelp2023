import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {SpinResult} from "./SpinResult";

class SlotGame {

    private reels: Reels;
    private payTable: PayTable;
    private calculateFreeGameIncrement: (screen: Screen) => number;


    constructor(reels: Reels, payTable: PayTable, calculateFreeGameIncrement: (screen: Screen) => number) {
        this.reels = reels;
        this.payTable = payTable;
        this.calculateFreeGameIncrement = calculateFreeGameIncrement;
    }

    doSpinFlow(bet: Bet): {
        odd: number,
        screen: string[][],
        freeGameIncrement: number
    } {
        this.reels.spin();
        const screen: Screen = this.reels.getScreen();
        return {
            odd: this.payTable.getOdd(screen, bet),
            screen: screen.getRawScreenClone(),
            freeGameIncrement: this.calculateFreeGameIncrement(screen)
        };
    }
}

export class ProbabilitySystem {

    private reels: Reels;
    private payTable: PayTable;
    private freeGameReels: Reels;
    private freeGamePayTable: PayTable;

    private freeGameCount: number = 0;
    private baseGame: SlotGame;
    private freeGame: SlotGame;


    private constructor(reels: Reels, payTable: PayTable, freeGameReels: Reels, freeGamePayTable: PayTable) {
        this.reels = reels;
        this.payTable = payTable;
        this.freeGameReels = freeGameReels;
        this.freeGamePayTable = freeGamePayTable;

        this.baseGame = new SlotGame(reels, payTable, (screen: Screen): number => screen.countSymbol('S') >= 3 ? 10 : 0);
        this.freeGame = new SlotGame(freeGameReels, freeGamePayTable, (screen: Screen): number => screen.countSymbol('S') >= 5 ? 10 : 0);

    }

    // ProbabilitySystem
    spin(bet: Bet): SpinResult {
        const {
            odd,
            screen,
            freeGameIncrement
        } = this.baseGame.doSpinFlow(bet);
        this.freeGameCount += freeGameIncrement;

        return SpinResult.of(odd, screen, this.getNextGameType());
    }

    spinFree(): SpinResult {
        const bet: Bet = new Bet(...(this.freeGamePayTable.payLines.map(payLine => payLine.getName())));

        const {
            odd,
            screen,
            freeGameIncrement
        } = this.freeGame.doSpinFlow(bet);
        this.freeGameCount += freeGameIncrement;

        this.freeGameCount--;
        return SpinResult.of(odd, screen, this.getNextGameType());

    }

    getScreen() {
        return this.getNextGameType() === "BASE_GAME"
            ? this.reels.getScreen()
            : this.freeGameReels.getScreen();
    }

    getNextGameType(): string {
        return this.freeGameCount > 0 ? "FREE_GAME" : "BASE_GAME";
    }

    static create(reels: Reels, payTable: PayTable, freeGameReels: Reels, freeGamePayTable: PayTable):
        ProbabilitySystem {
        return new ProbabilitySystem(reels, payTable, freeGameReels, freeGamePayTable);
    }
}