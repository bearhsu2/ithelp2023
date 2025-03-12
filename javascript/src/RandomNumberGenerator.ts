export class RandomNumberGenerator {
    private _integers: number[];
    private _nextIndex: number = 0;

    constructor(...numbers: number[]) {
        this._integers = numbers;
    }

    nextInteger(): number {
        const integer = this._integers[this._nextIndex];
        this._nextIndex++;
        return integer;
    }
}