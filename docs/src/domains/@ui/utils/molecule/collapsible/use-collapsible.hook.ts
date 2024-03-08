import { useCallback, useEffect, useState } from "react";

import { textContent } from '../../../../@shared/get-text-content';
import { isWindow } from '../../../../../utils/is-window';

import { UseCollapsibleProps } from "./collapsible.types";

export const useCollapsible = ({initialCollapsed, headProps }: UseCollapsibleProps) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(
    initialCollapsed ?? true,
  );

  const toggleCollapsed = useCallback(() => setCollapsed(prev => !prev), []);

  useEffect(() => {
      if (
        new URLSearchParams(isWindow() ? location.search : "")
          .get("openedMenus")
          ?.includes(textContent(headProps.children))
      )
        setCollapsed(false);
    }, [headProps]);

    return {
      isCollapsed,
      toggleCollapsed
    }
}