import { ReactNode } from "react";

import { entries, map, pipe } from "@fxts/core";
import { P, match } from "ts-pattern";

import { ElementType, Types, TypesToSlots } from "../internal/slots.types";
import { reduceSlotElements } from "../internal/reduce-slot-elements.util";
import { isSlottedElement } from "../internal/is-slotted-element.util";


export const useSlots = <T extends Types>(children: ReactNode, types: T) => {
  const typeAndKeyMap =  new Map(pipe(types as Types, entries, map(([key, type]) => [type, key.replace(/^[A-Z]/, char => char.toLowerCase())] as [ElementType, string])));

  return match(children)
    .with(P.array(), reduceSlotElements<T>(typeAndKeyMap)
    )
    .with(P.when(isSlottedElement(typeAndKeyMap)), (child) => ({
      [typeAndKeyMap.get(child.type)!]: child
    }))
    .otherwise(() => ({})) as TypesToSlots<T>
}