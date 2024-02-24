import { useEffect } from "react";

import { pipe } from "@fxts/core";
import { match } from "ts-pattern";

import { textContent } from './../../../../@shared/get-text-content';
import { isWindow } from './../../../../../utils/is-window';
import { appendToOpenedMenus, deleteFromOpenedMenus } from './collapsible.utils';
import { UseCollapsibleSearchQueryProps } from "./collapsible.types";

export const useCollapsibleSearchQuery = ({
  isCollapsed,
  headProps: head
}: UseCollapsibleSearchQueryProps) => {
  useEffect(() => {
      pipe(
        match({
          isCollapsed,
          search: new URLSearchParams(isWindow() ? location.search : ""),
        })
          .with(
            {
              isCollapsed: false,
            },
            appendToOpenedMenus(textContent(head.children)),
          )
          .otherwise(deleteFromOpenedMenus(textContent(head.children))),
        (search) =>
          isWindow() &&
          location.search.replace("?", "") !== search.toString() &&
          window.history.pushState(null, "", `?${search.toString()}`),
      );
    }, [isCollapsed]);
}