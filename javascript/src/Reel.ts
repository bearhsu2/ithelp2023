import {RandomNumberGenerator} from "./RandomNumberGenerator";

export class Reel {
    symbols: Array<string>;
    private randomNumberGenerator: RandomNumberGenerator;
    private index: number;

    constructor(symbols: Array<string>, randomNumberGenerator: RandomNumberGenerator) {
        this.symbols = symbols;
        this.randomNumberGenerator = randomNumberGenerator;
        this.index = 0;
    }

    getScreenColumn(): string[] {

        const screenColumn = this.symbols.slice(this.index, this.index + 3);

        if (screenColumn.length != 3) {
            throw new Error("Invalid Column size");
        }

        return screenColumn
    }

    static from(reel: Array<string>, randomNumberGenerator: RandomNumberGenerator) {
        return new Reel(reel, randomNumberGenerator);
    }

    spin() {
        this.index = this.randomNumberGenerator.nextInteger();
    }
}