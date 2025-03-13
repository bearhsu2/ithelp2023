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
        return this.symbols.slice(this.index, this.index + 3);
    }

    static from(reel: Array<string>, randomNumberGenerator: RandomNumberGenerator) {
        return new Reel(reel, randomNumberGenerator);
    }

    spin() {
        this.index = this.randomNumberGenerator.nextInteger();
    }
}