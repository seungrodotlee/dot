import { useMemo } from "react";

import { find, pipe, reduce } from "@fxts/core";

import { ContentsIndexQuery, ContentsQuery, MappedCategories, RawContent } from "./sidebar.types";
import { categoriesAccumulator, getOrderedCategories } from "./sidebar.utils";

export const useSidebarCategories = (data: ContentsIndexQuery & ContentsQuery, lib: string | null) => {
  return useMemo(() => {
    console.log("lib", lib);

    if(!lib) return;

    return pipe(
      reduce<RawContent, MappedCategories>(
        categoriesAccumulator,
        {},
        data.allMdx.nodes,
      ),
      getOrderedCategories(find(({ lib: _lib }) => _lib === lib, data.allYaml.edges[0].node.index)!.contents),
    );
  }, [data, lib]);
}