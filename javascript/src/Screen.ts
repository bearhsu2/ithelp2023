
export class Screen {
    private readonly rawScreen: Array<Array<string>>;

    static from(rawScreen: Array<Array<string>>): Screen {
        return new Screen(
            rawScreen
        );
    }

    constructor(rawScreen: Array<Array<string>>) {
        this.rawScreen = rawScreen;
    }

    // 每一 Column 同一 Row 的 Symbol 都相同
    isScreenRowHit(row: number): boolean {
        const uniqueElements = new Set<string>();
        for (let i: number = 0; i < this.rawScreen.length; i++) {
            const screenReel: string[] = this.rawScreen[i];
            uniqueElements.add(screenReel[row]);
        }
        return uniqueElements.size === 1;
    }

    // 每一 Column 指定 Row 的 Symbol 都相同
    isHit() {
        return this.rawScreen[0][0] === this.rawScreen[1][1]
            && this.rawScreen[1][1] === this.rawScreen[2][2]
            && this.rawScreen[2][2] === this.rawScreen[3][1]
            && this.rawScreen[3][1] === this.rawScreen[4][0];
    }

}