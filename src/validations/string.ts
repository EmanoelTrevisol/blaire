export function matchesPattern(
  str: string,
  pattern: string | RegExp,
  flags = 'g',
): boolean {
  const regExp = new RegExp(pattern, flags);
  return regExp.test(str);
}
