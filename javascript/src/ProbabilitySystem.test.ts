import {ProbabilitySystem} from "./ProbabilitySystem";
import {Reels} from "./Reels";
import {DesignatedNumberGenerator} from "./DesignatedNumberGenerator";
import {PayTable} from "./PayTable";
import {Bet} from "./Bet";
import {PayLine} from "./PayLine";
import {Odds} from "./Odds";
import {Odd} from "./Odd";

class SpinResult {
    odd: number;
    screen: string[][];

    constructor(odd: number, screen: string[][]) {
        this.odd = odd;
        this.screen = screen;
    }

    static of(odd: number, screen: string[][]) {
        return new SpinResult(odd, screen);
    }
}

describe('probability system', () => {

    test('Row1 hit, bet L2 -> 0', () => {
        const sut = ProbabilitySystem.create(
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
            ]))
        );
        expect(sut.spin(new Bet('L2'))).toBe(0);
    });

    test('Row1 hit, bet L1 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
                ['A', 'Q', 'K'],
                ['A', 'Q', 'K'],
                ['A', '10', 'J'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L1'))).toBe(20);
    });

    test('Row2 hit, bet L2 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['Q', 'A', 'K'],
                ['10', 'A', 'J'],
                ['Q', 'A', 'K'],
                ['A', 'A', 'K'],
                ['10', 'A', 'J'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L2'))).toBe(20);
    });
    test('Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'A'],
                ['10', 'J', 'A'],
                ['A', 'Q', 'A'],
                ['A', 'Q', 'A'],
                ['10', 'J', 'A'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L3'))).toBe(20);
    });


    test('Roll then Row3 hit, bet L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['9', 'K', 'Q', 'A'],
                ['10', '10', 'J', 'A'],
                ['9', 'K', 'Q', 'A'],
                ['9', 'K', 'Q', 'A'],
                ['10', '10', 'J', 'A'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L3'))).toBe(20);
    });

    test('Cyclic Rolling', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['A', 'K', 'Q'],
                ['A', '10', 'J'],
                ['A', 'K', 'Q'],
                ['A', 'K', 'Q'],
                ['A', '10', 'J'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L3'))).toBe(20);
    });

    test('Each Reel spins independently', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 1, 2, 3, 4), [
                ['A', 'Q', 'K'],
                ['9', 'A', '10', 'J'],
                ['8', '9', 'A', 'Q', 'K'],
                ['7', '8', '9', 'A', 'Q', 'K'],
                ['6', '7', '8', '9', 'A', '10', 'J'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L1'))).toBe(20);
    });

    test('Roll then Row2 hit, bet L1L2L3 -> 20', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
                ['K', 'Q', 'A'],
                ['10', 'J', 'A'],
                ['K', 'Q', 'A'],
                ['K', 'Q', 'A'],
                ['10', 'J', 'A'],
            ]), new PayTable([
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
        ])));
        expect(sut.spin(new Bet('L1', 'L2', 'L3'))).toBe(20);
    });

    test('Roll then Row1 Row3 hit, bet L1L2L3 -> 40', () => {
        const sut = ProbabilitySystem.create(Reels.create(
            new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                ['A', 'Q', 'A'],
                ['A', '10', 'A'],
                ['A', 'Q', 'A'],
                ['A', 'Q', 'A'],
                ['A', '10', 'A'],
            ]), new PayTable([
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
        ])));
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
            PayLine.from('L4', [0, 1, 2, 1, 0])], new Odds([
            new Odd('A', 5, 20),
            new Odd('A', 4, 15),
            new Odd('A', 3, 10),
            new Odd('K', 5, 15),
            new Odd('K', 4, 10),
            new Odd('K', 3, 8)
        ])));
        expect(sut.spin(new Bet('L4'))).toBe(20);
    });

    test('Row1 hit 4 Symbols, bet L1 => 15', () => {
        const sut = ProbabilitySystem.create(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['A', 'Q', 'K'],
                    ['A', '10', 'J'],
                    ['A', 'Q', 'K'],
                    ['A', 'Q', 'K'],
                    ['K', '10', 'J'],
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
            ]))
        );
        expect(sut.spin(new Bet('L1'))).toBe(15);
    });

    test('Row1 hit 3 Symbols, bet L1 => 10', () => {
        const sut = ProbabilitySystem.create(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['A', 'Q', 'K'],
                    ['A', '10', 'J'],
                    ['A', 'Q', 'K'],
                    ['J', 'Q', 'K'],
                    ['K', '10', 'J'],
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
            ]))
        );
        expect(sut.spin(new Bet('L1'))).toBe(10);
    });

    test('Row1 hit as K, bet L1 => 15', () => {
        const sut = ProbabilitySystem.create(
            Reels.create(
                new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
                    ['K', 'Q', 'A'],
                    ['K', '10', 'J'],
                    ['K', 'Q', 'A'],
                    ['K', 'Q', 'A'],
                    ['K', '10', 'J'],
                ]),
            new PayTable([
                PayLine.from('L1', [0, 0, 0, 0, 0]),
                PayLine.from('L2', [1, 1, 1, 1, 1]),
                PayLine.from('L3', [2, 2, 2, 2, 2]),
                PayLine.from('L4', [0, 1, 2, 1, 0])
            ], new Odds([
                new Odd('A', 5, 20),
                new Odd('A', 4, 15),
                new Odd('A', 3, 10),
                new Odd('K', 5, 15),
                new Odd('K', 4, 10),
                new Odd('K', 3, 8)
            ]))
        );
        expect(sut.spin(new Bet('L1'))).toBe(SpinResult.of(15, [
            ['K', 'Q', 'A'],
            ['K', '10', 'J'],
            ['K', 'Q', 'A'],
            ['K', 'Q', 'A'],
            ['K', '10', 'J']
        ]));

    });
});
