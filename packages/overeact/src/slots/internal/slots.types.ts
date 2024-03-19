import { JSXElementConstructor, ReactNode } from "react";

type ToCamelCase<T> = T extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : T;

export type ElementType = JSXElementConstructor<any> | string;
export type Types = Record<string, ElementType>;
export type TypesToSlots<T> = Partial<{
  [key in ToCamelCase<keyof T>]: ReactNode
} & Record<"defaultChildren", ReactNode[]>>;
