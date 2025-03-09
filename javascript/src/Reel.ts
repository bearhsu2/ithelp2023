export class Reel {
    symbols: Array<string>;

    constructor(symbols: Array<string>) {
        this.symbols = symbols;
    }

    getScreenColumn(index: number): string[] {
        return this.symbols.slice(index, index + 3);
    }

    static from(reel: Array<string>) {
        return new Reel(reel);
    }
}