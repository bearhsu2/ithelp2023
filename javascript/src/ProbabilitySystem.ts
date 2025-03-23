import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {Screen} from "./Screen";

export class ProbabilitySystem {

    private reels: Reels;
    private payTable: PayTable;

    private constructor(reels: Reels, payTable: PayTable) {
        this.reels = reels;
        this.payTable = payTable;
    }


    // ProbabilitySystem
    spin(bet: Bet): number {
        this.reels.spin();
        const screen: Screen = this.reels.getScreen();
        return this.payTable.getOdd(screen, bet);
    }


    static create(reels: Reels, payTable: PayTable):
        ProbabilitySystem {
        return new ProbabilitySystem(reels, payTable);
    }
}