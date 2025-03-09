import {Screen} from "./Screen";

class Reel {
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

export class Reels {
    reels: Array<Reel>;
    private index: number;
    private nextIndex: number;

    private constructor(reels: Array<Array<string>>, nextIndex: number) {

        this.reels = reels.map((reel: Array<string>): Reel => Reel.from(reel));

        this.index = 0;
        this.nextIndex = nextIndex;
    }


    spin(): void {
        this.index = this.nextIndex;
    }

    isRowHit(row: number): boolean {
        const screen: Screen = this.getScreen();
        return screen.isScreenRowHit(row);
    }

    private getScreen(): Screen {
        return Screen.from(
            this.reels.map((reel: Reel): Array<string> => reel.getScreenColumn(this.index))
        );
    }


    static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, nextIndex);
    }
}