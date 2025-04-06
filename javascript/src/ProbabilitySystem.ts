import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {SpinResult} from "./SpinResult";

export class ProbabilitySystem {

    private reels: Reels;
    private payTable: PayTable;

    private constructor(reels: Reels, payTable: PayTable) {
        this.reels = reels;
        this.payTable = payTable;
    }


    spin(bet: Bet): SpinResult {
        this.reels.spin();
        const screen: Screen = this.reels.getScreen();
        return SpinResult.of(this.payTable.getOdd(screen, bet), screen.getRawScreenClone(), "BASE_GAME");
    }


    static create(reels: Reels, payTable: PayTable):
        ProbabilitySystem {
        return new ProbabilitySystem(reels, payTable);
    }
}