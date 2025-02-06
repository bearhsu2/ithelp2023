class Sut {
    getValue() {
        return "hello ts";
    }
}

describe('abc', () => {

    test('abc', () => {
        const sut = new Sut();
        expect(sut.getValue()).toBe("hello ts");
    });

});
