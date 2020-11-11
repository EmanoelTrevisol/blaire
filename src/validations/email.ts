import isEmail from 'validator/lib/isEmail';

export function isValid(email: string) {
  return isEmail(email);
}
