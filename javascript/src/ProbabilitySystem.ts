import {Reels} from "./Reels";

export class ProbabilitySystem {

    private reels: Reels;

    constructor(reels: Reels) {
        this.reels = reels;
    }


    spin(betLine: string): number {

        if (this.reels.isRow1Hit() && betLine === 'L1') {
            return 20;
        }
        if (this.reels.isRow2Hit() && betLine === 'L2') {
            return 20;
        }

        return 0;

    }


}