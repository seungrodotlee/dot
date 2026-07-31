import { Tail } from "@repo/types";

declare const brandSymbol: unique symbol;

export type Brand<T, B> = T extends {
  readonly [brandSymbol]: {
    readonly value: infer Value extends unknown[];
  };
}
  ? Value[0] & {
      readonly [brandSymbol]: {
        readonly value: [...Value, T];
        readonly name: B;
      };
    }
  : T & {
      readonly [brandSymbol]: {
        readonly value: [T];
        readonly name: B;
      };
    };

export type Unbrand<T> = T extends {
  readonly [brandSymbol]: {
    readonly value: infer Value extends unknown[];
  };
}
  ? Tail<Value>
  : T;

export type DeepUnbrand<T> = T extends {
  readonly [brandSymbol]: {
    readonly value: infer Value extends unknown[];
  };
}
  ? Value[0]
  : T;

export function brand<T extends Brand<unknown, unknown>>() {
  return (data: Unbrand<T>) => data as T;
}
