export class Memento {
    private baseGameReelsIndexes: number[];
    private freeGameReelsIndexes: number[];
    private freeGameCount: number;

    constructor(baseGameReelsIndexes: number[], freeGameReelsIndexes: number[], freeGameCount: number) {
        this.baseGameReelsIndexes = baseGameReelsIndexes;
        this.freeGameReelsIndexes = freeGameReelsIndexes;
        this.freeGameCount = freeGameCount;
    }

    getBaseGameReelsIndexes(): number[] {
        return this.baseGameReelsIndexes;
    }

    getFreeGameReelsIndexes(): number[] {
        return this.freeGameReelsIndexes;
    }

    getFreeGameCount(): number {
        return this.freeGameCount;
    }
}
