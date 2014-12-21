jest.autoMockOff();

var { square, cube } = require('../src/');

describe('square', () => {
    it('computes the square of 5 as 25', () => {
        expect(square(5)).toBe(25);
    });
});

describe('cube', () => {
    it('computes the cube of 5 as 125', () => {
        expect(cube(5)).toBe(125);
    });
});
