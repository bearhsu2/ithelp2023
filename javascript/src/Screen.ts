class Hit {
    symbol: string;
    length: number;

    constructor(symbol: string, length: number) {
        this.symbol = symbol;
        this.length = length;
    }

}

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

    getHit(rows: number[]): Hit {
        if (rows.length !== this.rawScreen.length) {
            throw new Error("Invalid row number");
        }

        const firstSymbol = this.rawScreen[0][rows[0]];
        let longestHit = 1; // Start from 1 since the first element is always counted

        for (let i = 1; i < rows.length; i++) {
            if (this.rawScreen[i][rows[i]] !== firstSymbol) {
                break;
            }
            longestHit++;
        }

        return new Hit(firstSymbol, longestHit);
    }


}