const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    // #1
    test('convertHandler should correctly read a whole number input.', function () {
        const num = convertHandler.getNum('10kg');
        assert.strictEqual(num, 10);
    })

    // #2
    test('convertHandler should correctly read a decimal number input.', function () {
        const num = convertHandler.getNum('10.5gal');
        assert.strictEqual(num, 10.5);
    })

    // #3
    test('convertHandler should correctly read a fractional input.', function () {
        const num = convertHandler.getNum('0.5km');
        assert.strictEqual(num, 0.5);
    })

    // #4
    test('convertHandler should correctly read a fractional input with a decimal.', function () {
        const num = convertHandler.getNum('3/2lbs');
        assert.strictEqual(num, 3 / 2);
    })

    // #5
    test('convertHandler should correctly return an error on a double-fraction.', function () {
        assert.throw(() => convertHandler.getNum('3/2/3'), Error)
    })

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        const num = convertHandler.getNum('');
        assert.strictEqual(num, 1);
    })

    // #7
    test('convertHandler should correctly read each valid input unit.', function () {
        const unit = convertHandler.getUnit('10L');
        assert.strictEqual(unit, 'L');
    })

    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', function () {
        assert.throws(() => convertHandler.getUnit('3/2/3'), Error);
    })

    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', function () {
        const unitToReturnUnit = {
            L: 'gal',
            gal: 'L',
            kg: 'lbs',
            lbs: 'kg',
            km: 'mi',
            mi: 'km',
        };

        let returnUnit;
        Object.keys(unitToReturnUnit).forEach((initUnit) => {
            returnUnit = convertHandler.getReturnUnit(initUnit);
            assert.strictEqual(returnUnit, unitToReturnUnit[initUnit]);
        });
    });
    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
        const unitToFullString = {
            L: 'liters',
            gal: 'gallons',
            kg: 'kilograms',
            lbs: 'pounds',
            km: 'kilometers',
            mi: 'miles',
        };

        Object.keys(unitToFullString).forEach((initUnit) => {
            const fullString = convertHandler.spellOutUnit(initUnit);
            assert.strictEqual(fullString, unitToFullString[initUnit]);
        });
    })
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    function roundNumber(num) {
        return Math.round(num * 100000) / 100000;
    }

    // #11
    test('convertHandler should correctly convert gal to L.', function () {
        const result = convertHandler.convert(10, 'gal');
        assert.strictEqual(result, roundNumber(10 * galToL));
    })

    // #12
    test('convertHandler should correctly convert L to gal.', function () {
        const result = convertHandler.convert(10, 'L');
        assert.strictEqual(result, roundNumber(10 / galToL))
    })

    // #13
    test('convertHandler should correctly convert mi to km.', function () {
        const result = convertHandler.convert(25, 'mi');
        assert.strictEqual(result, roundNumber(25 * miToKm));
    })

    // #14
    test('convertHandler should correctly convert km to mi.', function () {
        const result = convertHandler.convert(5, 'km');
        assert.strictEqual(result, roundNumber(5 / miToKm));
    })

    // #15
    test('convertHandler should correctly convert lbs to kg.', function () {
        const result = convertHandler.convert(20, 'lbs');
        assert.strictEqual(result, roundNumber(20 * lbsToKg));
    })

    // #16
    test('convertHandler should correctly convert kg to lbs.', function () {
        const result = convertHandler.convert(100, 'kg');
        assert.strictEqual(result, roundNumber(100 / lbsToKg));
    })
});