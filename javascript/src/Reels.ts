import {Screen} from "./Screen";
import {Reel} from "./Reel";
import {RandomNumberGenerator} from "./RandomNumberGenerator";

export class Reels {
    reels: Array<Reel>;
    private indices: number[];

    private constructor(reels: Array<Array<string>>, randomNumberGenerator: RandomNumberGenerator) {

        this.reels = reels.map((reel: Array<string>): Reel => Reel.from(reel, randomNumberGenerator));

        this.indices = [0, 0, 0, 0, 0];
    }


    spin(): void {
        for (let i: number = 0; i < this.indices.length; ++i) {
            this.reels[i].spin();
        }
    }

    isRowHit(row: number): boolean {
        return this.getScreen().isScreenRowHit(row);
    }

    getScreen(): Screen {
        const rawScreen: Array<Array<string>> = [];
        for (let i: number = 0; i < this.reels.length; i++) {
            rawScreen.push(this.reels[i].getScreenColumn());
        }
        return Screen.from(rawScreen);
    }


    static create(randomNumberGenerator: RandomNumberGenerator, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, randomNumberGenerator);
    }
}