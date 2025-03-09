import {Screen} from "./Screen";

class Reel {
    symbols: Array<string>;

    constructor(symbols: Array<string>) {
        this.symbols = symbols;
    }

    getScreenColumn(index: number): string[] {
        return this.symbols.slice(index, index + 3);
    }
}

export class Reels {
    reels: Array<Reel>;
    private index: number;
    private nextIndex: number;

    private constructor(reels: Array<Array<string>>, nextIndex: number) {

        this.reels = reels.map((reel: Array<string>) => new Reel(reel));

        this.index = 0;
        this.nextIndex = nextIndex;
    }

    spin() {
        this.index = this.nextIndex;
    }

    isRowHit(row: number): boolean {
        const screen: Screen = this.getScreen();
        return screen.isScreenRowHit(row);
    }

    private getScreen(): Screen {
        return new Screen(
            this.reels.map((reel: Reel): Array<string> => reel.getScreenColumn(this.index))
        );
    }

    static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, nextIndex);
    }
}