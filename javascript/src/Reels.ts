class Screen {
    private readonly rawScreen: Array<Array<string>>;

    constructor(rawScreen: Array<Array<string>>) {
        this.rawScreen = rawScreen;
    }

    isScreenRowHit(row: number) {
        const uniqueElements = new Set<string>();
        for (let i: number = 0; i < this.rawScreen.length; i++) {
            const screenReel: string[] = this.rawScreen[i];
            uniqueElements.add(screenReel[row]);
        }
        return uniqueElements.size === 1;
    }
}

export class Reels {
    reels: Array<Array<string>>;
    private index: number;
    private nextIndex: number;

    private constructor(reels: Array<Array<string>>, nextIndex: number) {
        this.reels = reels;
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
        const rawScreen: Array<Array<string>> = [];
        for (let i: number = 0; i < this.reels.length; i++) {
            rawScreen.push(this.reels[i].slice(this.index, this.index + 3));
        }
        return new Screen(rawScreen);
    }

    static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, nextIndex);
    }
}