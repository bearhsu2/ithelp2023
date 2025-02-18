import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";

describe('probability system', () => {

    test('Row1 hit, bet L2 -> 0', () => {
        const sut = new ProbabilitySystem(new Reels(
            [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
            ]
        ));
        expect(sut.spin('L2')).toBe(0);
    });

    test('Row1 hit, bet L1 -> 20', () => {
        const sut = new ProbabilitySystem(new Reels(
            [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
            ]
        ));
        expect(sut.spin('L1')).toBe(20);
    });

    test('Row2 hit, bet L2 -> 20', () => {
        const sut = new ProbabilitySystem(new Reels(
            [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'Q', 'J'],
            ]
        ));
        expect(sut.spin('L2')).toBe(20);
    });


});
