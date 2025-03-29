import {Screen} from "./Screen";
import {Bet} from "./Bet";
import {Odd} from "./Odd";

export class PayLine {

    private name: string;
    private rows: number[];

    private odds: Array<Odd> = [
        new Odd('A', 5, 20),
        new Odd('A', 4, 15),
        new Odd('A', 3, 10),
        new Odd('K', 5, 15),
        new Odd('K', 4, 10),
        new Odd('K', 3, 8)
    ];

    constructor(name: string, rows: number[]) {
        this.name = name;
        this.rows = rows;
    }

    // PayLine
    getOdd(screen: Screen, bet: Bet): number {

        if (!bet.includes(this.name)) {
            return 0;
        }

        const hit = screen.getHit(this.rows);
        return this.odds.find(odd => odd.matches(hit))?.odd ?? 0;

    }


    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}