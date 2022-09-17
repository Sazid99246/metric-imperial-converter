const validUnitRegex = /kg|lbs|mi|km|gal|l/;

function ConvertHandler() {
  this.getNum = function (inputStr) {
    const safeString = inputStr.trim().toLowerCase();
    const numString = safeString.match(/^(?<NUMBER>.*)[a-zA-Z]*$/).groups
      .NUMBER;

    const numMatch = numString.match(
      /^((?<NUMERATOR>[0-9]*(?:\.[0-9]*)?)\/(?<DENOMINATOR>[0-9]*(?:\.[0-9]*)?)|(?<DECIMAL>[0-9]*(?:\.[0-9]*)?))[^0-9\.\/]*$/,
    );

    if (!numMatch) {
      throw new Error('invalid number');
    }

    const { NUMERATOR, DENOMINATOR, DECIMAL } = numMatch.groups;

    if (NUMERATOR && DENOMINATOR) {
      const num = Number(NUMERATOR);
      const denom = Number(DENOMINATOR);
      if (denom === 0) {
        throw new Error('invalid number (divide by 0)');
      }

      return num / denom;
    } else if (DECIMAL) {
      return Number(DECIMAL);
    } else {
      // No number was given - DECIMAL is empty string
      return 1;
    }
  };

  this.getUnit = function (inputStr) {
    const safeString = inputStr.trim().toLowerCase();

    const unitString = safeString.match(/[a-zA-Z]*$/)[0];

    const unitRegex = new RegExp(`^(?<UNIT>${validUnitRegex.source})$`);
    const unitMatch = unitString.match(unitRegex);

    if (!unitMatch) {
      // No valid unit detected - throw an error
      throw new Error('invalid unit');
    }

    return unitMatch.groups.UNIT === 'l' ? 'L' : unitMatch.groups.UNIT;
  };

  this.getReturnUnit = function (initUnit) {
    const unitToReturnUnit = {
      L: 'gal',
      gal: 'L',
      kg: 'lbs',
      lbs: 'kg',
      km: 'mi',
      mi: 'km',
    };

    return unitToReturnUnit[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitToFullString = {
      L: 'liters',
      gal: 'gallons',
      kg: 'kilograms',
      lbs: 'pounds',
      km: 'kilometers',
      mi: 'miles',
    };

    return unitToFullString[unit];
  };

  this.convert = function (initNum, initUnit) {
    const unitConversion = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934,
    };

    return Math.round(initNum * unitConversion[initUnit] * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const conversionString = `${initNum} ${this.spellOutUnit(
      initUnit,
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return conversionString;
  };
}

module.exports = ConvertHandler;