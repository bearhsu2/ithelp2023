import {Screen} from "./Screen";
import {Bet} from "./Bet";
import {Odds} from "./Odds";

export class PayLine {

    private name: string;
    private rows: number[];


    constructor(name: string, rows: number[]) {
        this.name = name;
        this.rows = rows;
    }

    // PayLine
    getOdd(screen: Screen, bet: Bet, odds: Odds): number {

        if (!bet.includes(this.name)) {
            return 0;
        }

        const hit = screen.getHit(this.rows);
        return odds.rawOdds.find(odd => odd.matches(hit))?.odd ?? 0;

    }


    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}