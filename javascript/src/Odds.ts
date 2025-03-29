import {Odd} from "./Odd";
import {Hit} from "./Hit";


export class Odds {
    private rawOdds: Array<Odd>;

    constructor(rawOdds: Array<Odd>) {
        this.rawOdds = rawOdds;
    }

    // Odds
    getOdd(hit: Hit): number {
        return this.rawOdds.find(odd => odd.matches(hit))?.odd ?? 0;
    }
}