import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {PayLine} from "./PayLine";

export class PayTable {

    payLines: Array<PayLine>;

    constructor(payLines: Array<PayLine>) {
        this.payLines = payLines;
    }

    getOdd(screen: Screen, bet: Bet): number {
        return this.payLines
            .reduce((odd, payLine) => odd + payLine.getOdd(screen, bet), 0);
    }

}