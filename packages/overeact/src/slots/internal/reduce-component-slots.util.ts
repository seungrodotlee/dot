import { ComponentProps, JSXElementConstructor, createElement } from "react";

import { entries, reduce } from "@fxts/core";

import { isIntrinsicElementType } from "../../is-intrinstic-element-type/is-intrinstic-element-type.util";

export const reduceComponentSlots = <SlotConstructors extends Record<string, keyof JSX.IntrinsicElements | JSXElementConstructor<any>>>(slots: SlotConstructors) => {
  return reduce(
      (result, [key, type]) => {
        if (isIntrinsicElementType(type)) {
          return {
            ...result,
            [key]: (props: ComponentProps<typeof type> | null | undefined) =>
              createElement(type, props),
          };
        }

        return {
          ...result,
          [key]: type,
        };
      },
      {} as {
        [Key in keyof SlotConstructors]: SlotConstructors[Key] extends JSXElementConstructor<any>
          ? SlotConstructors[Key]
          : JSXElementConstructor<ComponentProps<SlotConstructors[Key]>>;
      },
      entries(slots),
    );
}