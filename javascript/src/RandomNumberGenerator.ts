export class RandomNumberGenerator {
    private integers: number[];

    constructor(...numbers: number[]) {
        this.integers = numbers;
    }

    nextInteger(): number {
        return <number>this.integers.shift();
    }
}