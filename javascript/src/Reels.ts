import {Screen} from "./Screen";

export class Reels {
    reels: Array<Array<string>>;
    private index: number;
    private nextIndex: number;

    private constructor(reels: Array<Array<string>>, nextIndex: number) {
        this.reels = reels;
        this.index = 0;
        this.nextIndex = nextIndex;
    }


    // 中略…
    spin() {
        this.index = this.nextIndex;
    }

    isRowHit(row: number): boolean {
        const screen: Screen = this.getScreen();
        return screen.isScreenRowHit(row);
    }

    private getScreen(): Screen {
        const rawScreen: Array<Array<string>> = [];
        for (let i: number = 0; i < this.reels.length; i++) {
            rawScreen.push(this.reels[i].slice(this.index, this.index + 3));
        }
        return new Screen(rawScreen);
    }

    // 中略…
    static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, nextIndex);
    }
}