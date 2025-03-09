export class Screen {
    private readonly rawScreen: Array<Array<string>>;

    constructor(rawScreen: Array<Array<string>>) {
        this.rawScreen = rawScreen;
    }

    isScreenRowHit(row: number) {
        const uniqueElements = new Set<string>();
        for (let i: number = 0; i < this.rawScreen.length; i++) {
            const screenReel: string[] = this.rawScreen[i];
            uniqueElements.add(screenReel[row]);
        }
        return uniqueElements.size === 1;
    }

    static from(rawScreen: Array<Array<string>>) {
        return new Screen(
            rawScreen
        );
    }
}