const { add, subtract, divide, multiply } = require('./index');

function describe(desc, fn) {
    console.log(desc);
    fn();
}

function it(msg, fn) {
    describe(msg, fn)
}

const matchers = exp => ({
    toBe: assertion => {
        if (exp === assertion) {
            console.log("pass");
            return true;
        } else {
            console.log("fail");
            return false;
        }
    }
});


const expect = exp => matchers(exp);

describe('adder', () => {
    it('adds two numbers', () => {
        const result = add(10, 5);
        expect(result).toBe(15);
    })
})

describe('subtracter', () => {
    it('subtracts two numbers', () => {
        const result = subtract(10, 5);
        expect(result).toBe(5);
    })
})
describe('multiplier', () => {
    it('multiplies two numbers', () => {
        const result = multiply(10, 5);
        expect(result).toBe(50);
    })
})
describe('divider', () => {
    it('divides two numbers', () => {
        const result = divide(10, 5);
        expect(result).toBe(2);
    })
})


module.exports = {
    describe,
    expect,
    it,
    matchers
};