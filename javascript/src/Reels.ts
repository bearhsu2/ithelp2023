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

        const localRow: number = this.nextIndex + row;

        const uniqueElements = new Set<string>();
        for (let i: number = 0; i < this.reels.length; i++) {
            const reel: string[] = this.reels[i];
            uniqueElements.add(reel[localRow]);
        }
        return uniqueElements.size === 1;
    }

    static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, nextIndex);
    }
}