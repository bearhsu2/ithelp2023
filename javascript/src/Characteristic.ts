export class Characteristic {

    private baseGameReelsPositions: Array<Array<number>>;
    private freeGameCount: number;

    constructor(baseGameReelsPositions: Array<Array<number>> = [], freeGameCount: number = 0) {
        this.baseGameReelsPositions = baseGameReelsPositions;
        this.freeGameCount = freeGameCount;
    }

    getBaseGameReelsPositions(): Array<Array<number>> {
        return this.baseGameReelsPositions;
    }

    getFreeGameCount(): number {
        return this.freeGameCount;
    }
}
