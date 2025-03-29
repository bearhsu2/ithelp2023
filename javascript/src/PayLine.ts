import {Screen} from "./Screen";
import {Bet} from "./Bet";

class Odd {
    symbol: string;
    hitLength: number;
    odd: number;

    constructor(symbol: string, hitLength: number, odd: number) {
        this.symbol = symbol;
        this.hitLength = hitLength;
        this.odd = odd;
    }


}

export class PayLine {

    private name: string;
    private rows: number[];

    constructor(name: string, rows: number[]) {
        this.name = name;
        this.rows = rows;
    }

    getOdd(screen: Screen, bet: Bet): number {
        const odds: Array<Odd> = [
            new Odd('A', 5, 20),
            new Odd('A', 4, 15),
            new Odd('A', 3, 10),
            new Odd('K', 5, 15),
            new Odd('K', 4, 10),
            new Odd('K', 3, 8)
        ];

        if (!bet.includes(this.name)) {
            return 0;
        }

        return odds.find(odd => {
            const hit = screen.getHit(this.rows);
            return odd.symbol === hit.symbol && odd.hitLength === hit.length;
        })?.odd ?? 0;

    }

    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}