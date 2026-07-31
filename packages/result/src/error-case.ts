export type ErrorCase<
  Key extends string = string,
  Extra extends Record<string, unknown> = Record<string, unknown>,
> = {
  key: Key;
  extra: Extra;
};

export function errorCase<
  Key extends string = string,
  Extra extends Record<string, unknown> = Record<string, unknown>,
>(key: Key, extra: Extra) {
  return { key, extra };
}
