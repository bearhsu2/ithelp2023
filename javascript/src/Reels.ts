export class Reels {
    reels: Array<Array<string>>;

    constructor(reels: Array<Array<string>>) {
        this.reels = reels;
    }


    isRow1Hit(): boolean {
        const firstElementsSet = new Set<string>();
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            firstElementsSet.add(reel[0]);
        }
        return firstElementsSet.size === 1;
    }
}