import {ProbabilitySystem} from "./ProbabilitySystem";

describe('probability system', () => {

    test('lose', () => {
        const sut = new ProbabilitySystem();
        expect(sut.spin('L2')).toBe(0);
    });
    test('L1 hit -> 20', () => {
        const sut = new ProbabilitySystem();
        expect(sut.spin('L1')).toBe(20);
    });

});
