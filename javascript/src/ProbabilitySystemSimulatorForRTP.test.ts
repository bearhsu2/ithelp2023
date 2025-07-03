import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";
import {DesignatedNumberGenerator} from "./DesignatedNumberGenerator";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {PayLine} from "./PayLine";
import {Odds} from "./Odds";
import {Odd} from "./Odd";
import {SpinResult} from "./SpinResult";
import {Screen} from "./Screen";
import {SlotGame} from "./SlotGame";

describe('probability system simulator', () => {

    test('get RTP', () => {
        const baseGame = SlotGame.of(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['A', 'Q', 'K'],
                    ['A', '10', 'J'],
                    ['A', 'Q', 'K'],
                    ['A', 'Q', 'K'],
                    ['A', '10', 'J'],
                ]),
            new PayTable([
                PayLine.from('L1', [0, 0, 0, 0, 0]),
                PayLine.from('L2', [1, 1, 1, 1, 1]),
                PayLine.from('L3', [2, 2, 2, 2, 2]),
                PayLine.from('L4', [0, 1, 2, 1, 0])], new Odds([
                new Odd('A', 5, 20),
                new Odd('A', 4, 15),
                new Odd('A', 3, 10),
                new Odd('K', 5, 15),
                new Odd('K', 4, 10),
                new Odd('K', 3, 8)
            ])),
            (screen: Screen): number => screen.countSymbol('S') >= 3 ? 10 : 0
        );
        const freeGame = SlotGame.of(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['K', 'J', 'Q', 'A'],
                    ['K', 'Q', 'K', 'A'],
                    ['Q', 'K', '10', 'K'],
                    ['10', 'K', 'Q', 'A'],
                    ['J', 'Q', 'K', 'A'],
                ]),
            new PayTable([
                PayLine.from('L1', [0, 0, 0, 0, 0]),
                PayLine.from('L2', [1, 1, 1, 1, 1]),
                PayLine.from('L3', [2, 2, 2, 2, 2])
            ], new Odds([
                new Odd('A', 5, 2_000),
                new Odd('A', 4, 1_500),
                new Odd('A', 3, 1_000),
                new Odd('K', 5, 1_500),
                new Odd('K', 4, 1_000),
                new Odd('K', 3, 800),
            ])),
            (screen: Screen): number => screen.countSymbol('S') >= 5 ? 10 : 0
        );
        const sut = ProbabilitySystem.create(baseGame, freeGame);
        expect(sut.spin(new Bet('L2'))).toStrictEqual(SpinResult.of(0, [
            ['A', 'Q', 'K'],
            ['A', '10', 'J'],
            ['A', 'Q', 'K'],
            ['A', 'Q', 'K'],
            ['A', '10', 'J']
        ], "BASE_GAME"));
    });


});
