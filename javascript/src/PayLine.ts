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

        return bet.includes(this.name)
            ? odds.getOdd(screen.getHit(this.rows))
            : 0;

    }

    getName(): string {
        return this.name;
    }


    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}