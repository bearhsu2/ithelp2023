import {Bet} from "./Bet";
import {Screen} from "./Screen";

class PayLine {
    get rows(): number[] {
        return this._rows;
    }

    get name(): string {
        return this._name;
    }

    private _name: string;
    private _rows: number[];

    constructor(name: string, rows: number[]) {
        this._name = name;
        this._rows = rows;

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
            if (screen.isHit(payLine.rows) && bet.includes(payLine.name)) {
                odd += 20;
            }
        });
        return odd;
    }

}