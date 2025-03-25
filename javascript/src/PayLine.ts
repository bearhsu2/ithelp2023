import {Screen} from "./Screen";
import {Bet} from "./Bet";

export class PayLine {

    private name: string;
    private rows: number[];

    constructor(name: string, rows: number[]) {
        this.name = name;
        this.rows = rows;
    }

    getOdd(screen: Screen, bet: Bet): number {
        return screen.isHit(this.rows) && bet.includes(this.name)
            ? 20
            : 0;
    }

    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}