import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {SpinResult} from "./SpinResult";

export class ProbabilitySystem {

    private reels: Reels;
    private payTable: PayTable;
    private freeGameReels: Reels;
    private nextGameType: string = "BASE_GAME";

    private constructor(reels: Reels, payTable: PayTable, freeGameReels: Reels) {
        this.reels = reels;
        this.payTable = payTable;
        this.freeGameReels = freeGameReels;
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

    static create(reels: Reels, payTable: PayTable, freeGameReels: Reels):
        ProbabilitySystem {
        return new ProbabilitySystem(reels, payTable, freeGameReels);
    }
}