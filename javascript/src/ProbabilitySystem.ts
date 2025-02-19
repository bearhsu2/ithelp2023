import {Reels} from "./Reels";

export class ProbabilitySystem {

    private reels: Reels;

    private constructor(reels: Reels) {
        this.reels = reels;
    }


    spin(betLine: string): number {

        if (this.reels.isRowHit(0) && betLine === 'L1') {
            return 20;
        }
        if (this.reels.isRowHit(1) && betLine === 'L2') {
            return 20;
        }
        return 0;

    }


    static create(reels: Reels) {
        return new ProbabilitySystem(reels);
    }
}