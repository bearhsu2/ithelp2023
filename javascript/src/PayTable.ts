import {Bet} from "./Bet";
import {Screen} from "./Screen";

class PayLine {

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
}

export class PayTable {

    payLines: Array<PayLine> = [
        new PayLine('L1', [0, 0, 0, 0, 0]),
        new PayLine('L2', [1, 1, 1, 1, 1]),
        new PayLine('L3', [2, 2, 2, 2, 2]),
        new PayLine('L4', [0, 1, 2, 1, 0])
    ];

    getOdd(screen: Screen, bet: Bet): number {

        let odd: number = 0;
        this.payLines.forEach((payLine: PayLine) => {
            odd += payLine.getOdd(screen, bet);
        });
        return odd;

    }

}