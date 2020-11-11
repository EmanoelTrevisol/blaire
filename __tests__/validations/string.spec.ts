import { matchesPattern } from '@validations/string';

const lowerPattern = /[a-z]/;
const upperPattern = /[A-Z]/;
const digitsPattern = /[0-9]/;

const onlyLowercase = 'abdvksd';
const onlyUppercase = onlyLowercase.toUpperCase();
const mixedLowerUpper = 'aBcdADkdgEFHSD';
const onlyDigits = '109';
const mixedLowerAndDigits = 'a2c4e';
const mixedUpperAndDigits = 'A2C4E';
const allMixed = 'Abcksdf8734fhjsdf';

describe('validations/string.ts', () => {
  describe('matchesPattern', () => {
    test('pattern: lowercase', () => {
      expect(matchesPattern(onlyLowercase, lowerPattern)).toBe(true);
      expect(matchesPattern(onlyUppercase, lowerPattern)).toBe(false);
      expect(matchesPattern(mixedLowerUpper, lowerPattern)).toBe(true);
      expect(matchesPattern(onlyDigits, lowerPattern)).toBe(false);
      expect(matchesPattern(mixedLowerAndDigits, lowerPattern)).toBe(true);
      expect(matchesPattern(mixedUpperAndDigits, lowerPattern)).toBe(false);
      expect(matchesPattern(allMixed, lowerPattern)).toBe(true);
    });

    test('pattern: uppercase', () => {
      expect(matchesPattern(onlyLowercase, upperPattern)).toBe(false);
      expect(matchesPattern(onlyUppercase, upperPattern)).toBe(true);
      expect(matchesPattern(mixedLowerUpper, upperPattern)).toBe(true);
      expect(matchesPattern(onlyDigits, upperPattern)).toBe(false);
      expect(matchesPattern(mixedLowerAndDigits, upperPattern)).toBe(false);
      expect(matchesPattern(mixedUpperAndDigits, upperPattern)).toBe(true);
      expect(matchesPattern(allMixed, upperPattern)).toBe(true);
    });

    test('pattern: digits', () => {
      expect(matchesPattern(onlyLowercase, digitsPattern)).toBe(false);
      expect(matchesPattern(onlyUppercase, digitsPattern)).toBe(false);
      expect(matchesPattern(mixedLowerUpper, digitsPattern)).toBe(false);
      expect(matchesPattern(onlyDigits, digitsPattern)).toBe(true);
      expect(matchesPattern(mixedLowerAndDigits, digitsPattern)).toBe(true);
      expect(matchesPattern(mixedUpperAndDigits, digitsPattern)).toBe(true);
      expect(matchesPattern(allMixed, digitsPattern)).toBe(true);
    });
  });
});
