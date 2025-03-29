import {Hit} from "./Hit";

export class Odd {
    symbol: string;
    hitLength: number;
    odd: number;

    constructor(symbol: string, hitLength: number, odd: number) {
        this.symbol = symbol;
        this.hitLength = hitLength;
        this.odd = odd;
    }


    matches(hit: Hit) {
        return this.symbol === hit.symbol && this.hitLength === hit.length;
    }

}