export class RandomNumberGenerator {
    private _integers: number[];

    constructor(...numbers: number[]) {
        this._integers = numbers;
    }

    nextInteger(): number {
        return <number>this._integers.shift();
    }
}