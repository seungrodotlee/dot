import { useMemo } from "react";

import { pipe, reduce } from "@fxts/core";

import { ContentsIndexQuery, ContentsQuery, MappedCategories, RawContent } from "./sidebar.types";
import { categoriesAccumulator, getOrderedCategories } from "./sidebar.utils";

export const useSidebarCategories = (data: ContentsIndexQuery & ContentsQuery) => {
  return useMemo(() => {
    return pipe(
      reduce<RawContent, MappedCategories>(
        categoriesAccumulator,
        {},
        data.allMdx.nodes,
      ),
      getOrderedCategories(data.allYaml.edges[0].node.index),
    );
  }, [data]);
}