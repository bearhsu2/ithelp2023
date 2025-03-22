import {Reels} from "./Reels";
import {PayTable} from "./PayTable";

export class ProbabilitySystem {

    private reels: Reels;
    private payTable: PayTable;

    private constructor(reels: Reels, payTable: PayTable) {
        this.reels = reels;
        this.payTable = payTable;
    }


    spin(...betLines: string[]): number {
        this.reels.spin();
        return this.payTable.getOdd(betLines, this.reels);
    }


    static create(reels: Reels, payTable: PayTable):
        ProbabilitySystem {
        return new ProbabilitySystem(reels, payTable);
    }
}