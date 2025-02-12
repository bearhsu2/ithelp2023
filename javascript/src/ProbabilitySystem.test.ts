class ProbabilitySystem {
    spin() {
        return 0;
    }
}

describe('probability system', () => {

    test('lose', () => {
        const sut = new ProbabilitySystem();
        expect(sut.spin()).toBe(0);
    });

});
