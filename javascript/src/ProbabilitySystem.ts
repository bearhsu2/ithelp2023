import {Reels} from "./Reels";

export class ProbabilitySystem {

    private reels: Reels;

    private constructor(reels: Reels) {
        this.reels = reels;
    }


    spin(betLine: string): number {

        this.reels.spin();

        if (this.reels.isRowHit(0) && betLine === 'L1') {
            return 20;
        }
        if (this.reels.isRowHit(1) && betLine === 'L2') {
            return 20;
        }

        if (this.reels.isRowHit(2) && betLine === 'L3') {
            return 20;
        }
        return 0;

    }


    static create(reels: Reels): ProbabilitySystem {
        return new ProbabilitySystem(reels);
    }
}