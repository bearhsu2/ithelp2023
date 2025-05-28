import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {Screen} from "./Screen";
import {Bet} from "./Bet";

export class SlotGame {

    private reels: Reels;
    private payTable: PayTable;
    private calculateFreeGameIncrement: (screen: Screen) => number;


    constructor(reels: Reels, payTable: PayTable, calculateFreeGameIncrement: (screen: Screen) => number) {
        this.reels = reels;
        this.payTable = payTable;
        this.calculateFreeGameIncrement = calculateFreeGameIncrement;
    }

    doSpinFlow(bet: Bet): {
        odd: number,
        screen: string[][],
        freeGameIncrement: number
    } {
        this.reels.spin();
        const screen: Screen = this.reels.getScreen();
        return {
            odd: this.payTable.getOdd(screen, bet),
            screen: screen.getRawScreenClone(),
            freeGameIncrement: this.calculateFreeGameIncrement(screen)
        };
    }

    getScreen(): Screen {
        return this.reels.getScreen();
    }
}