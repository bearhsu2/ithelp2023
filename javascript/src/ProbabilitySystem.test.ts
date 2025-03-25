import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";
import {DesignatedNumberGenerator} from "./DesignatedNumberGenerator";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {PayLine} from "./PayLine";

describe('probability system', () => {

    test('Row1 hit, bet L2 -> 0', () => {
        const sut = ProbabilitySystem.create(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['A', 'Q', 'K'],
                    ['A', 'Q', 'K'],
                    ['A', 'Q', 'K'],
                    ['A', 'Q', 'K'],
                    ['A', '10', 'J'],
                ]),
            new PayTable([
                PayLine.from('L1', [0, 0, 0, 0, 0]),
                PayLine.from('L2', [1, 1, 1, 1, 1]),
                PayLine.from('L3', [2, 2, 2, 2, 2]),
                PayLine.from('L4', [0, 1, 2, 1, 0])]
            )
        );
        expect(sut.spin(new Bet('L2'))).toBe(0);
    });

    test('Row1 hit, bet L1 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L1'))).toBe(20);
    });

    test('Row2 hit, bet L2 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'Q', 'J'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L2'))).toBe(20);
    });
    test('Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'J', 'K'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L3'))).toBe(20);
    });


    test('Roll then Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['9', 'A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['10', '10', 'J', 'K'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L3'))).toBe(20);
    });

    test('Cyclic Rolling', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['K', 'A', 'Q'],
                ['K', 'A', 'Q'],
                ['K', 'A', 'Q'],
                ['K', 'A', 'Q'],
                ['K', '10', 'J'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L3'))).toBe(20);
    });

    test('Each Reel spins independently', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 1, 2, 3, 4), [
                ['A', 'Q', 'K'],
                ['9', 'A', 'Q', 'K'],
                ['8', '9', 'A', 'Q', 'K'],
                ['7', '8', '9', 'A', 'Q', 'K'],
                ['6', '7', '8', '9', 'A', '10', 'J'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L1'))).toBe(20);
    });

    test('Roll then Row2 hit, bet L1L2L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['10', 'J', 'K'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L1', 'L2', 'L3'))).toBe(20);
    });

    test('Roll then Row1 Row3 hit, bet L1L2L3 -> 40', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'K'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L1', 'L2', 'L3'))).toBe(40);
    });

    test('L4 hit, bet L4 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'J', 'J'],
                ['J', 'A', 'Q'],
                ['Q', 'Q', 'A'],
                ['K', 'A', 'K'],
                ['A', 'K', 'J'],
            ]), new PayTable([
            PayLine.from('L1', [0, 0, 0, 0, 0]),
            PayLine.from('L2', [1, 1, 1, 1, 1]),
            PayLine.from('L3', [2, 2, 2, 2, 2]),
            PayLine.from('L4', [0, 1, 2, 1, 0])]));
        expect(sut.spin(new Bet('L4'))).toBe(20);
    });

});
