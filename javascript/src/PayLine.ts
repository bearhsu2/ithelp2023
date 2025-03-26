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
        if (bet.includes(this.name)) {
            if (screen.getHitLine(this.rows) == 5) {
                return 20;
            } else {
                return 15;
            }
        } else {
            return 0;
        }
    }

    static from(name: string, rows: number[]): PayLine {
        return new PayLine(name, rows);
    }
}