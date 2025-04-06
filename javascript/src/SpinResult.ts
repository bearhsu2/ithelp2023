export class SpinResult {
    odd: number;
    screen: string[][];
    nextGameType: string;

    constructor(odd: number, screen: string[][], nextGameType: string) {
        this.odd = odd;
        this.screen = screen;
        this.nextGameType = nextGameType;
    }

    static of(odd: number, screen: string[][], nextGameType: string) {
        return new SpinResult(odd, screen, nextGameType);
    }
}