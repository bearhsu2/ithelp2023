import {RandomNumberGenerator} from "./RandomNumberGenerator";

export class DesignatedNumberGenerator implements RandomNumberGenerator {
    private integers: number[];

    constructor(...numbers: number[]) {
        this.integers = numbers;
    }

    nextInteger(): number {
        return <number>this.integers.shift();
    }
}