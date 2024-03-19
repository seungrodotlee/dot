import { JSXElementConstructor } from "react";

export const isIntrinsicElementType = (
  type: keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
): type is keyof JSX.IntrinsicElements => typeof type === "string";
