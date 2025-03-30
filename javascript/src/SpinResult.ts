export class SpinResult {
    odd: number;
    screen: string[][];

    constructor(odd: number, screen: string[][]) {
        this.odd = odd;
        this.screen = screen;
    }

    static of(odd: number, screen: string[][]) {
        return new SpinResult(odd, screen);
    }
}