import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {PayLine} from "./PayLine";

export class PayTable {

    payLines: Array<PayLine> = [
        PayLine.from('L1', [0, 0, 0, 0, 0]),
        PayLine.from('L2', [1, 1, 1, 1, 1]),
        PayLine.from('L3', [2, 2, 2, 2, 2]),
        PayLine.from('L4', [0, 1, 2, 1, 0])
    ];

    constructor(payLines: Array<PayLine>) {
        this.payLines = payLines;
    }

    getOdd(screen: Screen, bet: Bet): number {
        return this.payLines
            .reduce((odd, payLine) => odd + payLine.getOdd(screen, bet), 0);
    }

}