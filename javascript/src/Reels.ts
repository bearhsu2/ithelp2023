import {Screen} from "./Screen";
import {Reel} from "./Reel";
import {DesignatedNumberGenerator} from "./DesignatedNumberGenerator";
import {DBCTool} from "./DBCTool";

export class Reels {
    reels: Array<Reel>;

    private constructor(reels: Array<Array<string>>, randomNumberGenerator: DesignatedNumberGenerator) {
        this.reels = reels.map((reel: Array<string>): Reel => Reel.from(reel, randomNumberGenerator));
    }


    spin(): void {
        for (let i: number = 0; i < this.reels.length; ++i) {
            this.reels[i].spin();
        }
    }

    getScreen(): Screen {
        const rawScreen: Array<Array<string>> = [];
        for (let i: number = 0; i < this.reels.length; i++) {
            rawScreen.push(this.reels[i].getScreenColumn());
        }
        return Screen.from(rawScreen);
    }

    static create(randomNumberGenerator: DesignatedNumberGenerator, rawReels: Array<Array<string>>): Reels {
        return new Reels(rawReels, randomNumberGenerator);
    }

    getIndexes(): number[] {
        return this.reels.map((reel: Reel): number => reel.getIndex());
    }

    setIndexes(reelsIndexes: Array<number>) {
        DBCTool.require(() => reelsIndexes.length == this.reels.length, "Invalid reels indexes length");

        for (let i = 0; i < reelsIndexes.length; i++) {
            this.reels[i].setIndex(reelsIndexes[i]);
        }
    }
}