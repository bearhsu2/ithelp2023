export class Characteristic {
    private baseGameReelsIndexes: number[];
    private freeGameCount: number;

    constructor(baseGameReelsIndexes: number[], freeGameCount: number) {
        this.baseGameReelsIndexes = baseGameReelsIndexes;
        this.freeGameCount = freeGameCount;
    }

    getBaseGameReelsIndexes(): number[] {
        return this.baseGameReelsIndexes;
    }

    getFreeGameCount(): number {
        return this.freeGameCount;
    }
}
