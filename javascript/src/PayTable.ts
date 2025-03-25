import {Bet} from "./Bet";
import {Screen} from "./Screen";

export class PayTable {

    // 程式
    getOdd(screen: Screen, bet: Bet): number {

        let odd = 0;

        if (screen.isScreenRowHit(0) && bet.includes('L1')) {
            odd += 20;
        }
        if (screen.isScreenRowHit(1) && bet.includes('L2')) {
            odd += 20;
        }
        if (screen.isScreenRowHit(2) && bet.includes('L3')) {
            odd += 20;
        }

        if (screen.isHit() && bet.includes('L4')) {
            odd += 20;
        }

        return odd;
    }

}