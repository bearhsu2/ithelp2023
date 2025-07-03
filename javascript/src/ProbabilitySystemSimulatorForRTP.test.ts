import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";
import {PayTable} from "./PayTable";
import {PayLine} from "./PayLine";
import {Odds} from "./Odds";
import {Odd} from "./Odd";
import {Screen} from "./Screen";
import {SlotGame} from "./SlotGame";
import {NativeRandomNumberGenerator} from "./NativeRandomNumberGenerator";
import {Bet} from "./Bet";

describe('probability system simulator', () => {

    test.skip("temp", async () => {
        function generateRandomPokerArray(length: number): string[] {
            const pokerNumbers = ['A', '9', '10', 'J', 'Q', 'K', 'A', '9', '9', '10', 'J', 'Q', 'K'];
            return Array.from({length}, () => pokerNumbers[Math.floor(Math.random() * pokerNumbers.length)]);
        }

        console.log(generateRandomPokerArray(8)); // 输出类似 ["A", "10", "3", "K", "7", "2", "Q", "5", "J", "8"]


    })

    test('RTP Simulator', () => {

        const baseGame: SlotGame = SlotGame.of(
            Reels.create(
                new NativeRandomNumberGenerator(), [
                    ['A', 'Q', 'K', 'A', 'S', 'A', '9', '10', 'K', 'J', 'S', '10', 'J', 'A', 'Q', 'A', '9'],
                    ['A', '10', 'J', 'J', 'Q', '10', 'J', '10', '9', 'A', 'K', '10', '10'],
                    ['A', 'Q', 'K', 'J', 'J', 'A', 'S', 'Q', 'Q', '9', '10', 'S', 'J', '9', '9', '9', 'Q', 'A'],
                    ['A', 'Q', 'K', 'J', 'A', '9', 'J', 'S', 'Q', '9', 'K', '10', 'S', 'A', 'A', 'K', 'J', 'Q', 'K', 'Q', 'Q'],
                    ['A', '10', 'J', 'A', '9', 'J', '10', 'S', 'K', 'Q', '9', '9']
                ]),
            new PayTable(
                [
                    PayLine.from('L1', [0, 0, 0, 0, 0]),
                    PayLine.from('L2', [1, 1, 1, 1, 1]),
                    PayLine.from('L3', [2, 2, 2, 2, 2]),
                    PayLine.from('L4', [0, 1, 2, 1, 0]),
                    PayLine.from('L5', [2, 1, 0, 1, 2]),
                    PayLine.from('L6', [0, 0, 1, 0, 0]),
                    PayLine.from('L7', [2, 2, 1, 2, 2]),
                    PayLine.from('L8', [1, 2, 2, 2, 1]),
                    PayLine.from('L9', [1, 0, 0, 0, 1])
                ],
                new Odds([
                    new Odd('A', 5, 20),
                    new Odd('A', 4, 15),
                    new Odd('A', 3, 10),
                    new Odd('K', 5, 15),
                    new Odd('K', 4, 10),
                    new Odd('K', 3, 8),
                    new Odd('Q', 5, 10),
                    new Odd('Q', 4, 8),
                    new Odd('Q', 3, 5),
                    new Odd('J', 5, 10),
                    new Odd('J', 4, 8),
                    new Odd('J', 3, 5),
                    new Odd('10', 5, 10),
                    new Odd('10', 4, 8),
                    new Odd('10', 3, 5),
                    new Odd('9', 5, 10),
                    new Odd('9', 4, 8),
                    new Odd('9', 3, 5)
                ])),
            (screen: Screen): number => screen.countSymbol('S') >= 3 ? 10 : 0
        );
        const freeGame: SlotGame = SlotGame.of(
            Reels.create(
                new NativeRandomNumberGenerator(), [
                    ['K', 'J', 'Q', 'S', 'S', 'S', 'A', '9', 'Q', 'A', 'J', 'S', 'A', 'K', 'Q', '10'],
                    ['K', 'Q', 'K', 'A', '9', 'K', '9', 'Q', '9', '9', '9', 'S', 'S', 'S', 'S', 'K', '9', 'K', '9', 'Q', '9', '9', '9', 'K'],
                    ['Q', 'K', '10', 'K', 'S', 'K', 'A', 'S', 'Q', 'Q', '10', '10', 'J', 'J'],
                    ['10', 'K', 'Q', 'A', '9', '9', '10', 'S', 'K', 'S', 'J', '10', 'A', 'J', 'J', 'K', 'J', 'A', 'Q', 'J', '9', '9', '9', 'A'],
                    ['J', 'Q', 'S', 'K', 'A', '9', '10', 'Q', 'A', 'S', 'S', 'A', 'S', 'J', 'Q', 'J'],
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
                new Odd('Q', 5, 1_000),
                new Odd('Q', 4, 800),
                new Odd('Q', 3, 500),
                new Odd('J', 5, 1_000),
                new Odd('J', 4, 800),
                new Odd('J', 3, 500),
                new Odd('10', 5, 1_000),
                new Odd('10', 4, 800),
                new Odd('10', 3, 500),
                new Odd('9', 5, 1_000),
                new Odd('9', 4, 800),
                new Odd('9', 3, 500)
            ])),
            (screen: Screen): number => screen.countSymbol('S') >= 5 ? 10 : 0
        );
        const sut = ProbabilitySystem.create(baseGame, freeGame);

        let nextGameType = sut.getNextGameType();
        const rounds = 1_000_000;
        let totalOdd = 0;
        for (let i = 0; i < rounds; i++) {

            const spinResult = "BASE_GAME" === nextGameType
                ? sut.spin(new Bet('L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'))
                : sut.spinFree();

            totalOdd += spinResult.odd;
            nextGameType = spinResult.nextGameType;

        }

        console.log(`Total odd: ${totalOdd}, Average odd: ${totalOdd / rounds}`);

    });


});
