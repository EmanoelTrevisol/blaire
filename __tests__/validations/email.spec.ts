import { isValid } from '@validations/email';

describe('validations/email.ts', () => {
  describe('isValid', () => {
    test('invalid emails', () => {
      expect(isValid('')).toBe(false);
      expect(isValid('email')).toBe(false);
      expect(isValid('asd.a@')).toBe(false);
      expect(isValid('asd.a@a')).toBe(false);
    });

    test('valid emails', () => {
      expect(isValid('teste@teste.com')).toBe(true);
      expect(isValid('a@ab.cd')).toBe(true);
      expect(isValid('contato@grupoboticario.com.br')).toBe(true);
    });
  });
});
