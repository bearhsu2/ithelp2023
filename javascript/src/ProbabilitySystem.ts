import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {SpinResult} from "./SpinResult";

export class ProbabilitySystem {

    private reels: Reels;
    private payTable: PayTable;
    private freeGameReels: Reels;
    private freeGamePayTable: PayTable;

    private nextGameType: string = "BASE_GAME";

    private constructor(reels: Reels, payTable: PayTable, freeGameReels: Reels, freeGamePayTable: PayTable) {
        this.reels = reels;
        this.payTable = payTable;
        this.freeGameReels = freeGameReels;
        this.freeGamePayTable = freeGamePayTable;
    }

    // ProbabilitySystem
    spin(bet: Bet): SpinResult {
        return this.doSpinFlow(bet, this.reels, this.payTable,
            (screen: Screen): string => screen.countSymbol('S') >= 3 ? "FREE_GAME" : "BASE_GAME");
    }


    private doSpinFlow(bet: Bet, theReels: Reels, thePayTable: PayTable, getNext: (screen: Screen) => string) {

        theReels.spin();

        const screen: Screen = theReels.getScreen();

        this.nextGameType = getNext(screen);

        return SpinResult.of(thePayTable.getOdd(screen, bet), screen.getRawScreenClone(), this.nextGameType);
    }

    spinFree(): SpinResult {
        const bet: Bet = new Bet(...(this.freeGamePayTable.payLines.map(payLine => payLine.getName())));
        return this.doSpinFlow(bet, this.freeGameReels, this.freeGamePayTable,
            (screen: Screen): string => "FREE_GAME");
    }

    getScreen() {
        return this.nextGameType === "BASE_GAME"
            ? this.reels.getScreen()
            : this.freeGameReels.getScreen();
    }

    static create(reels: Reels, payTable: PayTable, freeGameReels: Reels, freeGamePayTable: PayTable):
        ProbabilitySystem {
        return new ProbabilitySystem(reels, payTable, freeGameReels, freeGamePayTable);
    }
}