import {Screen} from "./Screen";
import {Bet} from "./Bet";

class Odd {
    hitLength: number;
    odd: number;

    constructor(hitLength: number, odd: number) {
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
            new Odd(5, 20),
            new Odd(4, 15),
            new Odd(3, 10)
        ];

        if (!bet.includes(this.name)) {
            return 0;
        }

        return odds.find(odd => odd.hitLength === screen.getHit(this.rows).length)?.odd ?? 0;

    }

    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}