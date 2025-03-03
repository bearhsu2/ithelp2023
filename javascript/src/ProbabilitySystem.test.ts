import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";

describe('probability system', () => {

    test('Row1 hit, bet L2 -> 0', () => {
        const sut = ProbabilitySystem.create(Reels.create(
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
        const sut = ProbabilitySystem.create(Reels.create(
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
        const sut = ProbabilitySystem.create(Reels.create(
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
    test('Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'J', 'K'],
            ]
        ));
        expect(sut.spin('L3')).toBe(20);
    });


    // test('Roll then Row3 hit, bet L3 -> 20', () => {
    //     const sut = ProbabilitySystem.create(Reels.create(
    //         [
    //             ['A', 'Q', 'K'],
    //             ['A', 'Q', 'K'],
    //             ['A', 'Q', 'K'],
    //             ['A', 'Q', 'K'],
    //             ['10', 'J', '9', 'K'],
    //         ]
    //     ));
    //     expect(sut.spin('L3')).toBe(20);
    // });

});
