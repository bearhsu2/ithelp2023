import {RandomNumberGenerator} from "./RandomNumberGenerator";

export class NativeRandomNumberGenerator implements RandomNumberGenerator {

    nextInteger(upperBoundExclusive: number): number {
        return Math.floor(Math.random() * upperBoundExclusive);
    }
}