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
        if (this.isRow2Hit() && betLine === 'L2') {
            return 20;
        }

        return 0;

    }

    private isRow2Hit() {
        const secondElementsSet = new Set<string>();
        for (let i = 0; i < this.reels.reels.length; i++) {
            const reel = this.reels.reels[i];
            secondElementsSet.add(reel[1]);
        }
        const isRow2Hit = secondElementsSet.size === 1;
        return isRow2Hit;
    }
}