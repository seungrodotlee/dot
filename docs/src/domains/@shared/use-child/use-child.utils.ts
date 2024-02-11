import { Componentable, ReactElement, ReactNode } from "react";

import { filter, find, pipe, toArray } from "@fxts/core";
import { P, match } from "ts-pattern";

export const childrenSelector =
  <Multi extends boolean>(children: ReactNode, options?: { multiselect?: Multi }) => (type: Componentable): Multi extends true ? ReactElement[] : (ReactElement | undefined) => {
    return match(children)
      .with(P.array({ type: P._ }), (children: Iterable<ReactElement>) =>
        pipe(
          (child: ReactElement) => child.type === type,
          (pred) => match(!!(options?.multiselect))
            .with(true, () => pipe(filter(pred, children), toArray))
            .otherwise(() => find(pred, children))
        ),
      )
      .with({ type }, (child) => child as ReactElement)
      .otherwise(() => undefined) as any;
  };