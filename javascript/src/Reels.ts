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
        const screen: Array<Array<string>> = this.getScreen();
        return this.isScreenRowHit(screen, row);
    }

    private isScreenRowHit(screen: Array<Array<string>>, row: number) {
        const uniqueElements = new Set<string>();
        for (let i: number = 0; i < screen.length; i++) {
            const screenReel: string[] = screen[i];
            uniqueElements.add(screenReel[row]);
        }
        return uniqueElements.size === 1;
    }

    private getScreen() {
        const screen: Array<Array<string>> = [];
        for (let i: number = 0; i < this.reels.length; i++) {
            screen.push(this.reels[i].slice(this.index, this.index + 3));
        }
        return screen;
    }

    static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, nextIndex);
    }
}