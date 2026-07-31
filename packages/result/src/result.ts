import { ErrorCase } from "./error-case";

type Ok<Value> = Value extends null ? { ok: true } : { ok: true } & Value;
type Fail<ErrorCasesUnion extends ErrorCase> = { ok: false; error: ErrorCasesUnion };

export type Result<
  Value extends Record<string, unknown> | null,
  ErrorCases extends Array<ErrorCase>,
> = Ok<Value> | Fail<ErrorCases[number]>;

export const result = {
  ok<Value extends Record<string, unknown> | null = null>(value?: Value): Ok<Value> {
    if (value == null) {
      return {
        ok: true,
      } as Ok<Value>;
    }

    return {
      ok: true,
      ...value,
    } as Ok<Value>;
  },
  fail<E extends ErrorCase>(error: E): Fail<E> {
    return {
      ok: false,
      error,
    };
  },
};
