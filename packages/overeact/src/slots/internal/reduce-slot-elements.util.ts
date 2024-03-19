import { ReactNode } from "react"

import { reduce } from "@fxts/core"
import { P, match } from "ts-pattern"

import { isSlottedElement } from "./is-slotted-element.util"
import { ElementType, TypesToSlots } from "./slots.types"

export const reduceSlotElements = <T>(typeAndKeyMap: Map<ElementType, string>) => (children: ReactNode) => {
  return reduce(
    (result, child) => 
      match(child)
        .with(P.when(isSlottedElement(typeAndKeyMap)), (child) => ({
          ...result,
          [typeAndKeyMap.get(child.type)!]: child
        }))
        .otherwise((child) => ({
          ...result,
          defaultChildren: [...(result.defaultChildren ?? []), child]
        })), 
    {} as TypesToSlots<T>, 
    children as any[]
  )
}