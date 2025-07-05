import {ProbabilitySystem} from "./ProbabilitySystem";
import {SlotGame} from "./SlotGame";
import {Reels} from "./Reels";
import {NativeRandomNumberGenerator} from "./NativeRandomNumberGenerator";
import {PayTable} from "./PayTable";
import {PayLine} from "./PayLine";
import {Odds} from "./Odds";
import {Odd} from "./Odd";
import {Screen} from "./Screen";

export class ProbabilitySystemFactory {


    myHashMap: Map<string, any> = new Map([
        ['JinInManWu', {
            "baseGameSettings": {
                "reels": [
                    ['A', 'Q', 'K', 'A', 'S', 'A', '9', '10', 'K', 'J', 'S', '10', 'J', 'A', 'Q', 'A', '9'],
                    ['A', '10', 'J', 'J', 'Q', '10', 'J', '10', '9', 'A', 'K', '10', '10'],
                    ['A', 'Q', 'K', 'J', 'J', 'A', 'S', 'Q', 'Q', '9', '10', 'S', 'J', '9', '9', '9', 'Q', 'A'],
                    ['A', 'Q', 'K', 'J', 'A', '9', 'J', 'S', 'Q', '9', 'K', '10', 'S', 'A', 'A', 'K', 'J', 'Q', 'K', 'Q', 'Q'],
                    ['A', '10', 'J', 'A', '9', 'J', '10', 'S', 'K', 'Q', '9', '9']
                ],
                "payLines": [
                    {"name": "L1", "indexes": [0, 0, 0, 0, 0]},
                    {"name": "L2", "indexes": [1, 1, 1, 1, 1]},
                    {"name": "L3", "indexes": [2, 2, 2, 2, 2]},
                    {"name": "L4", "indexes": [0, 1, 2, 1, 0]},
                    {"name": "L5", "indexes": [2, 1, 0, 1, 2]},
                    {"name": "L6", "indexes": [0, 0, 1, 0, 0]},
                    {"name": "L7", "indexes": [2, 2, 1, 2, 2]},
                    {"name": "L8", "indexes": [1, 2, 2, 2, 1]},
                    {"name": "L9", "indexes": [1, 0, 0, 0, 1]}
                ],
                "odds": [
                    {"symbol": "A", "count": 5, "odd": 20},
                    {"symbol": "A", "count": 4, "odd": 15},
                    {"symbol": "A", "count": 3, "odd": 10},
                    {"symbol": "K", "count": 5, "odd": 15},
                    {"symbol": "K", "count": 4, "odd": 10},
                    {"symbol": "K", "count": 3, "odd": 8},
                    {"symbol": "Q", "count": 5, "odd": 10},
                    {"symbol": "Q", "count": 4, "odd": 8},
                    {"symbol": "Q", "count": 3, "odd": 5},
                    {"symbol": "J", "count": 5, "odd": 10},
                    {"symbol": "J", "count": 4, "odd": 8},
                    {"symbol": "J", "count": 3, "odd": 5},
                    {"symbol": "10", "count": 5, "odd": 10},
                    {"symbol": "10", "count": 4, "odd": 8},
                    {"symbol": "10", "count": 3, "odd": 5},
                    {"symbol": "9", "count": 5, "odd": 10},
                    {"symbol": "9", "count": 4, "odd": 8},
                    {"symbol": "9", "count": 3, "odd": 5}
                ],
                "freeGameIncrementParameters": {"symbol": "S", "count": 3, "increment": 10}
            },
            "freeGameSettings": {
                "reels": [
                    ['K', 'J', 'Q', 'S', 'S', 'S', 'A', '9', 'Q', 'A', 'J', 'S', 'A', 'K', 'Q', '10'],
                    ['K', 'Q', 'K', 'A', '9', 'K', '9', 'Q', '9', '9', '9', 'S', 'S', 'S', 'S', 'K', '9', 'K', '9', 'Q', '9', '9', '9', 'K'],
                    ['Q', 'K', '10', 'K', 'S', 'K', 'A', 'S', 'Q', 'Q', '10', '10', 'J', 'J'],
                    ['10', 'K', 'Q', 'A', '9', '9', '10', 'S', 'K', 'S', 'J', '10', 'A', 'J', 'J', 'K', 'J', 'A', 'Q', 'J', '9', '9', '9', 'A'],
                    ['J', 'Q', 'S', 'K', 'A', '9', '10', 'Q', 'A', 'S', 'S', 'A', 'S', 'J', 'Q', 'J']
                ],
                "payLines": [
                    {"name": "L1", "indexes": [0, 0, 0, 0, 0]},
                    {"name": "L2", "indexes": [1, 1, 1, 1, 1]},
                    {"name": "L3", "indexes": [2, 2, 2, 2, 2]}
                ],
                "odds": [
                    {"symbol": "A", "count": 5, "odd": 2000},
                    {"symbol": "A", "count": 4, "odd": 1500},
                    {"symbol": "A", "count": 3, "odd": 1000},
                    {"symbol": "K", "count": 5, "odd": 1500},
                    {"symbol": "K", "count": 4, "odd": 1000},
                    {"symbol": "K", "count": 3, "odd": 800},
                    {"symbol": "Q", "count": 5, "odd": 1000},
                    {"symbol": "Q", "count": 4, "odd": 800},
                    {"symbol": "Q", "count": 3, "odd": 500},
                    {"symbol": "J", "count": 5, "odd": 1000},
                    {"symbol": "J", "count": 4, "odd": 800},
                    {"symbol": "J", "count": 3, "odd": 500}],
                "freeGameIncrementParameters": {"symbol": "S", "count": 5, "increment": 10}
            }
        }]
    ]);

    createProbabilitySystem(gameId: string): ProbabilitySystem {
        const settings = this.myHashMap.get('JinInManWu');

        const baseGameSettings = settings.baseGameSettings;
        const baseGame: SlotGame = SlotGame.of(
            Reels.create(
                new NativeRandomNumberGenerator(),
                baseGameSettings.reels
            ),
            new PayTable(
                baseGameSettings.payLines.map((pl: {
                    name: string;
                    indexes: number[];
                }) => PayLine.from(pl.name, pl.indexes)),
                new Odds(baseGameSettings.odds.map((od: {
                    symbol: string;
                    count: number;
                    odd: number;
                }) => new Odd(od.symbol, od.count, od.odd)))
            ),
            (screen: Screen): number => screen.countSymbol(baseGameSettings.freeGameIncrementParameters.symbol) >= baseGameSettings.freeGameIncrementParameters.count ? baseGameSettings.freeGameIncrementParameters.increment : 0
        );


        const freeGameSettings = settings.freeGameSettings;
        const freeGame: SlotGame = SlotGame.of(
            Reels.create(
                new NativeRandomNumberGenerator(),
                freeGameSettings.reels
            ),
            new PayTable(
                freeGameSettings.payLines.map((pl: {
                    name: string;
                    indexes: number[];
                }) => PayLine.from(pl.name, pl.indexes)),
                new Odds(freeGameSettings.odds.map((od: {
                    symbol: string;
                    count: number;
                    odd: number;
                }) => new Odd(od.symbol, od.count, od.odd))))
            ,
            (screen: Screen): number => screen.countSymbol(freeGameSettings.freeGameIncrementParameters.symbol) >= freeGameSettings.freeGameIncrementParameters.count ? freeGameSettings.freeGameIncrementParameters.increment : 0
        );
        return ProbabilitySystem.create(baseGame, freeGame);
    }

}