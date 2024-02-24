import { ReactElement, ReactNode } from "react";

import { join, map, pipe } from "@fxts/core";
import { P, match } from "ts-pattern";

export const textContent = (element: ReactNode): string => {
  return match(element)
    .with(P.nullish, () => "")
    .with(P.string, (element) => element)
    .with(P.array(), (element: (ReactElement | string)[]) => pipe(
      element,
      map(textContent),
      join("")
    ))
    .with({
      props: {
        children: P.array()
      }
    }, (element) => 
      pipe(
        element.props.children as (ReactElement | string)[], 
        map(textContent), 
        join("")
      )
    )
    .otherwise((element) => textContent(
      (element as unknown as ReactElement).props.children
    ));
}