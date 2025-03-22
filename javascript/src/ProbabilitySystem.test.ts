import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";
import {DesignatedNumberGenerator} from "./DesignatedNumberGenerator";

describe('probability system', () => {

    test('Row1 hit, bet L2 -> 0', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
            ]));
        expect(sut.spin('L2')).toBe(0);
    });

    test('Row1 hit, bet L1 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
            ]));
        expect(sut.spin('L1')).toBe(20);
    });

    test('Row2 hit, bet L2 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'Q', 'J'],
            ]));
        expect(sut.spin('L2')).toBe(20);
    });
    test('Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'J', 'K'],
            ]));
        expect(sut.spin('L3')).toBe(20);
    });


    test('Roll then Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['9', 'A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['10', '10', 'J', 'K'],
            ]));
        expect(sut.spin('L3')).toBe(20);
    });

    test('Cyclic Rolling', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['K', 'A', 'Q'],
                ['K', 'A', 'Q'],
                ['K', 'A', 'Q'],
                ['K', 'A', 'Q'],
                ['K', '10', 'J'],
            ]));
        expect(sut.spin('L3')).toBe(20);
    });

    test('Each Reel spins independently', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 1, 2, 3, 4), [
                ['A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['8', '9', 'A', 'Q', 'K'],
                ['7', '8', '9', 'A', 'Q', 'K'],
                ['6', '7', '8', '9', 'A', '10', 'J'],
            ]));
        expect(sut.spin('L1')).toBe(20);
    });

    test('Roll then Row3 hit, bet L1L2L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'J', 'K'],
            ]));
        expect(sut.spin('L1', 'L2', 'L3')).toBe(20);
    });

});
