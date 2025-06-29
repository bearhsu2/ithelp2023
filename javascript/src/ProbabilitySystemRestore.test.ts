import {SlotGame} from "./SlotGame";
import {Reels} from "./Reels";
import {DesignatedNumberGenerator} from "./DesignatedNumberGenerator";
import {PayTable} from "./PayTable";
import {PayLine} from "./PayLine";
import {Odds} from "./Odds";
import {Odd} from "./Odd";
import {Screen} from "./Screen";
import {ProbabilitySystem} from "./ProbabilitySystem";
import {Bet} from "./Bet";
import {Characteristic} from "./Characteristic";

export function create_probability_system(baseGameRandoms: number[]) {
    const baseGame = SlotGame.of(
        Reels.create(
            new DesignatedNumberGenerator(...baseGameRandoms), [
                ['K', 'Q', 'A', 'A', 'S'],
                ['K', '10', 'J', 'A', 'S'],
                ['K', 'Q', 'A', 'J', 'Q'],
                ['K', 'Q', 'A', 'K', 'S'],
                ['K', '10', 'J', 'Q', 'J']
            ]),
        new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
        ], new Odds([
            new Odd('A', 5, 20),
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
                ['J', 'Q', 'K', 'A']
            ]),
        new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
        ], new Odds([
            new Odd('A', 5, 2_000)
        ])),
        (screen: Screen): number => screen.countSymbol('S') >= 5 ? 10 : 0
    );
    const original = ProbabilitySystem.create(baseGame, freeGame);
    return original;
}

describe('probability system restores', () => {


    test('Recovery BaseGame', () => {
        const original: ProbabilitySystem = create_probability_system([1, 1, 1, 1, 1]);

        original.spin(new Bet('L1'));

        const characteristic: Characteristic = original.getCharacteristic();

        const restored: ProbabilitySystem = create_probability_system([1, 1, 1, 1, 1])
        restored.restore(characteristic);


        expect(restored.getNextGameType()).toBe("BASE_GAME");
        expect(restored.getScreen()).toStrictEqual(Screen.from([
                    ['Q', 'A', 'A'],
                    ['10', 'J', 'A'],
                    ['Q', 'A', 'J'],
                    ['Q', 'A', 'K'],
                    ['10', 'J', 'Q']
                ]
            )
        );
    });

    test('Recovery Free Game Count', () => {
        const original: ProbabilitySystem = create_probability_system([2, 2, 2, 2, 2]);

        original.spin(new Bet('L1'));

        const characteristic: Characteristic = original.getCharacteristic();

        const restored: ProbabilitySystem = create_probability_system([2, 2, 2, 2, 2])
        restored.restore(characteristic);

        expect(restored.getNextGameType()).toBe("FREE_GAME");
        expect(restored.getScreen()).toStrictEqual(Screen.from([
                    ['K', 'J', 'Q'],
                    ['K', 'Q', 'K'],
                    ['Q', 'K', '10'],
                    ['10', 'K', 'Q'],
                    ['J', 'Q', 'K']
                ]
            )
        );

        for (let i = 0; i < 10; i++) {
            restored.spinFree();
        }

        expect(restored.getNextGameType()).toBe("BASE_GAME");
        expect(restored.getScreen()).toStrictEqual(Screen.from([
            ['A', 'A', 'S'],
            ['J', 'A', 'S'],
            ['A', 'J', 'Q'],
            ['A', 'K', 'S'],
            ['J', 'Q', 'J'],
        ]));
    });

});
