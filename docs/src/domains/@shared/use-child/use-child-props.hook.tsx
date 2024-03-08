import { Componentable, DependencyList, ReactNode, useCallback } from "react";

import { map, pipe, prop, toArray } from "@fxts/core";

import { childrenSelector } from "./use-child.utils";

const useChildProps = (children: ReactNode, deps?: DependencyList) => {
  const getChildProps = useCallback(
    <C extends Componentable>(type: C): Parameters<C>[0] => {
      if (!children) return undefined;

      return pipe(type, childrenSelector(children), prop("props"));
    },
    [children, ...(deps ?? [])],
  );

  const getChildrenProps = useCallback(
    <C extends Componentable>(type: C): Parameters<C>[0] => {
      return pipe(
        type,
        childrenSelector(children, {
          multiselect: true,
        }),
        map((child) => child.props),
        toArray,
      );
    },
    [children, ...(deps ?? [])],
  );

  return {
    getChildProps,
    getChildrenProps,
  };
};

export default useChildProps;
