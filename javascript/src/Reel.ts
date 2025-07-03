import {DBCTool} from "./DBCTool";
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

    getIndex(): number {
        return this.index;
    }

    setIndex(index: number): void {
        this.index = index;
    }


    getScreenColumn(): string[] {

        const screenColumn: string[] = Array.from(
            {length: 3},
            (_, k) => this.symbols[(this.index + k) % this.symbols.length]
        );

        DBCTool.ensure((): boolean => screenColumn.length == 3, "Invalid column size");


        return screenColumn
    }

    static from(reel: Array<string>, randomNumberGenerator: RandomNumberGenerator) {
        return new Reel(reel, randomNumberGenerator);
    }

    spin() {
        this.index = this.randomNumberGenerator.nextInteger(this.symbols.length);
    }
}