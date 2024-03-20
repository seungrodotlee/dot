import { useMemo } from "react";

import { find, pipe, reduce } from "@fxts/core";

import { ContentsIndexQuery, ContentsQuery, RawContent } from "../../../../types/queries.types";

import { MappedCategories } from "./sidebar.types";
import { categoriesAccumulator, getOrderedCategories } from "./sidebar.utils";

export const useSidebarCategories = (data: ContentsIndexQuery & ContentsQuery, prefix: string | null) => {
  return useMemo(() => {
    if(!prefix) return;

    return pipe(
      reduce<RawContent, MappedCategories>(
        categoriesAccumulator,
        {},
        data.allMdx.nodes,
      ),
      getOrderedCategories(find(({ prefix: _prefix }) => _prefix === prefix, data.allYaml.edges[0].node.index)?.contents ?? []),
    );
  }, [data, prefix]);
}