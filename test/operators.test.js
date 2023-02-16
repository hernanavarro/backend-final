const { add, sub, reset } = require("../services/operators");
describe('Operators module', () => {

    test('Add 2 to current number', () => {
        let count = 0;
        expect(add(count, 2)).toBe(2);
    });

    test('Subtract 2 from the current number', () => {
        let count = 0;
        expect(sub(count, 2)).toBe(-2);
    });

    test('Reset count', () => {
        expect(reset()).toBe(0);
    });
});
