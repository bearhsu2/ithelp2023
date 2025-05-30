import {Hit} from "./Hit";
import {DBCTool} from "./DBCTool";

export class Screen {
    get rawScreen(): Array<Array<string>> {
        return this._rawScreen;
    }

    private readonly _rawScreen: Array<Array<string>>;

    static from(rawScreen: Array<Array<string>>): Screen {
        return new Screen(
            rawScreen
        );
    }

    constructor(rawScreen: Array<Array<string>>) {
        this._rawScreen = rawScreen;
    }

    // Screen
    countSymbol(target: string) {
        return this.rawScreen
            .reduce((count, row) => count + row.filter(symbol => symbol === target).length, 0);
    }

    getHit(rows: number[]): Hit {

        DBCTool.require(() => rows.length == this._rawScreen.length, "Invalid row number");

        const firstSymbol = this._rawScreen[0][rows[0]];
        let longestHit = 1; // Start from 1 since the first element is always counted

        for (let i = 1; i < rows.length; i++) {
            if (this._rawScreen[i][rows[i]] !== firstSymbol) {
                break;
            }
            longestHit++;
        }

        return new Hit(firstSymbol, longestHit);
    }


    // Screen
    getRawScreenClone(): Array<Array<string>> {
        return this._rawScreen.map(row => [...row]);
    }

}