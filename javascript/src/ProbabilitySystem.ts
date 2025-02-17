import {Reels} from "./Reels";

export class ProbabilitySystem {


    constructor(reels: Reels) {
        this.reels = reels;
    }

    reels: Reels = new Reels(
        [
            ['A', 'Q', 'K'],
            ['A', 'Q', 'K'],
            ['A', 'Q', 'K'],
            ['A', 'Q', 'K'],
            ['A', '10', 'J'],
        ]
    );

    spin(betLine: string): number {

        return this.reels.isRow1Hit() && betLine === 'L1'
            ? 20
            : 0;

    }

}