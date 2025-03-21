import {RandomNumberGenerator} from "./RandomNumberGenerator";

export class NativeRandomNumberGenerator implements RandomNumberGenerator {
    constructor(upperBound: number) {
        this.upperBound = upperBound;
    }

    private upperBound: number;


    nextInteger(): number {
        return Math.floor(Math.random() * this.upperBound);
    }
}