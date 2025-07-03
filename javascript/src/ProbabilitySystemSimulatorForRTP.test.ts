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

    test("temp", async () => {
        function generateRandomPokerArray(length: number): string[] {
            const pokerNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
            return Array.from({length}, () => pokerNumbers[Math.floor(Math.random() * pokerNumbers.length)]);
        }

        console.log(generateRandomPokerArray(8)); // 输出类似 ["A", "10", "3", "K", "7", "2", "Q", "5", "J", "8"]


    })

    test('RTP Simulator', () => {

        const baseGame = SlotGame.of(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['A', 'Q', 'K', 'A', 'S', 'A', '2', '3', 'K', '4', 'S', '10', 'J', 'A', '5', '7', '9'],
                    ['A', '10', 'J', 'J', '5', '3', 'J', '3', '2', '7', '6', '10', '10'],
                    ['A', 'Q', 'K', '4', 'J', 'A', 'S', 'Q', '5', '2', '10', 'S', '4', '2', '8', '2', '5', 'A'],
                    ['A', 'Q', 'K', '4', 'A', '9', '4', 'S', 'Q', '9', '6', '3', 'S', 'A', 'A', '6', 'J', 'Q', '6', '5', 'Q'],
                    ['A', '10', 'J', 'A', '9', 'J', '3', 'S', '6', '5', '9', '2']
                ]),
            new PayTable(
                [
                    PayLine.from('L1', [0, 0, 0, 0, 0]),
                    PayLine.from('L2', [1, 1, 1, 1, 1]),
                    PayLine.from('L3', [2, 2, 2, 2, 2]),
                    PayLine.from('L4', [0, 1, 2, 1, 0])
                ],
                new Odds([
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
                    ['K', 'J', 'Q', 'S', 'S', 'S', 'A', '2', '5', 'A', 'J', 'A', '6', '5', '10'],
                    ['K', 'Q', 'K', 'A', '8', 'K', '9', '5', '2', '8', '9', 'S', 'S', 'S', 'S', 'K', '8', 'K', '9', '5', '2', '8', '9', 'K'],
                    ['Q', 'K', '10', 'K', '6', '7', 'S', 'Q', '5', '3', '10', '4', '4'],
                    ['10', 'K', 'Q', 'A', '9', '9', '3', 'S', '6', '4', '3', '7', '4', '4', '6', '4', 'A', '5', 'J', '9', '9', '9', 'A'],
                    ['J', 'Q', 'S', 'K', 'A', '9', '10', 'Q', 'A', 'S', 'S', 'A', '4', '5', 'J'],
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
        // expect(sut.spin(new Bet('L2'))).toStrictEqual(SpinResult.of(0, [
        //     ['A', 'Q', 'K'],
        //     ['A', '10', 'J'],
        //     ['A', 'Q', 'K'],
        //     ['A', 'Q', 'K'],
        //     ['A', '10', 'J']
        // ], "BASE_GAME"));
    });


});
