import {Bet} from "./Bet";
import {Screen} from "./Screen";
import {PayLine} from "./PayLine";
import {Odds} from "./Odds";

export class PayTable {

    payLines: Array<PayLine>;
    odds: Odds;

    constructor(payLines: Array<PayLine>, odds: Odds) {
        this.payLines = payLines;
        this.odds = odds;
    }

    // PayTable
    getOdd(screen: Screen, bet: Bet): number {
        return this.payLines.reduce((totalOdd, payLine) => totalOdd + payLine.getOdd(screen, bet, this.odds), 0);
    }

}