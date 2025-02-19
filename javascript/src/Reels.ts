export class Reels {
    reels: Array<Array<string>>;

    private constructor(reels: Array<Array<string>>) {
        this.reels = reels;
    }


    isRowHit(row: any): boolean {
        const uniqueElements = new Set<string>();
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            uniqueElements.add(reel[row]);
        }
        return uniqueElements.size === 1;
    }

    static create(rawReels: Array<Array<string>>) {
        return new Reels(rawReels);
    }
}