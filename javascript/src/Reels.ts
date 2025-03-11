import {Screen} from "./Screen";
import {Reel} from "./Reel";
import {RandomNumberGenerator} from "./RandomNumberGenerator";

export class Reels {
    reels: Array<Reel>;
    private index: number;
    private nextIndex: number;

    private constructor(reels: Array<Array<string>>, randomNumberGenerator: RandomNumberGenerator) {

        this.reels = reels.map((reel: Array<string>): Reel => Reel.from(reel));

        this.index = 0;
        this.nextIndex = randomNumberGenerator.nextInteger();
    }


    spin(): void {
        this.index = this.nextIndex;
    }

    isRowHit(row: number): boolean {
        return this.getScreen().isScreenRowHit(row);
    }

    private getScreen(): Screen {
        return Screen.from(
            this.reels.map((reel: Reel): Array<string> => reel.getScreenColumn(this.index))
        );
    }


    static create(randomNumberGenerator: RandomNumberGenerator, rawReels: Array<Array<string>>): Reels {

        return new Reels(rawReels, randomNumberGenerator);
    }
}