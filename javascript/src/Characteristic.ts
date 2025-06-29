export class Characteristic {

    private baseGameReelsIndice: Array<Array<number>>;
    private freeGameCount: number;

    constructor(baseGameReelsIndice: Array<Array<number>> = [], freeGameCount: number = 0) {
        this.baseGameReelsIndice = baseGameReelsIndice;
        this.freeGameCount = freeGameCount;
    }

    getBaseGameReelsIndice(): Array<Array<number>> {
        return this.baseGameReelsIndice;
    }

    getFreeGameCount(): number {
        return this.freeGameCount;
    }
}
