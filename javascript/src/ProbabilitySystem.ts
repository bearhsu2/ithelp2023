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

    private freeGameCount: number = 0;

    private constructor(reels: Reels, payTable: PayTable, freeGameReels: Reels, freeGamePayTable: PayTable) {
        this.reels = reels;
        this.payTable = payTable;
        this.freeGameReels = freeGameReels;
        this.freeGamePayTable = freeGamePayTable;
    }

    // ProbabilitySystem
    spin(bet: Bet): SpinResult {
        const {odd, screen} = this.doSpinFlow(bet, this.reels, this.payTable);
        this.freeGameCount += this.reels.getScreen().countSymbol('S') >= 3 ? 10 : 0;
        return SpinResult.of(odd, screen, this.getNextGameType());
    }


    private doSpinFlow(bet: Bet, theReels: Reels, thePayTable: PayTable): { odd: number, screen: string[][] } {
        theReels.spin();
        const screen: Screen = theReels.getScreen();
        return {odd: thePayTable.getOdd(screen, bet), screen: screen.getRawScreenClone()};
    }

    spinFree(): SpinResult {
        const bet: Bet = new Bet(...(this.freeGamePayTable.payLines.map(payLine => payLine.getName())));
        const {odd, screen} = this.doSpinFlow(bet, this.freeGameReels, this.freeGamePayTable);
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