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
        this.reels.spin();
        const screen: Screen = this.reels.getScreen();

        this.nextGameType = screen.countSymbol('S') >= 3 ? "FREE_GAME" : "BASE_GAME";

        return SpinResult.of(this.payTable.getOdd(screen, bet), screen.getRawScreenClone(), this.nextGameType);

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

    spinFree(): SpinResult {
        this.reels.spin();
        const screen: Screen = this.freeGameReels.getScreen();

        this.nextGameType = "FREE_GAME";

        const names: string[] = this.freeGamePayTable.payLines.map(payLine => payLine.getName());
        const bet: Bet = new Bet(...names);


        return SpinResult.of(this.freeGamePayTable.getOdd(screen, bet), screen.getRawScreenClone(), this.nextGameType);


    }
}