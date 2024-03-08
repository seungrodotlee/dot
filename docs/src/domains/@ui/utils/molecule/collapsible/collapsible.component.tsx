import { createContext, forwardRef, useCallback, useEffect } from "react";

import { navigate } from "gatsby";

import { refineProps } from "../../../../../utils";
import Chevron from "../../../display/atoms/chevron.component";
import useChild from "../../../../@shared/use-child/use-child.hook";
import useChildProps from "../../../../@shared/use-child/use-child-props.hook";
import createGhostComponent from "../../../../@shared/create-component/create-ghost-component.creator";

import Collapsible_Details from "./collapsible-details.component";
import { StyledCollapsible } from "./collapsible.styles";
import { CollapsibleHeadProps, CollapsibleProps } from "./collapsible.types";
import { useCollapsibleSearchQuery } from "./use-collapsible-search-query.hook";
import { useCollapsible } from "./use-collapsible.hook";

export const CollapsibleContext = createContext<boolean>(false);

const _Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ initialCollapsed, children, onToggle, ...props }, ref) => {
    const { getChild } = useChild(children);
    const { getChildProps } = useChildProps(children);

    const headProps = getChildProps(Collapsible.Header);

    const details = getChild(Collapsible.Details);

    const { isCollapsed, toggleCollapsed } = useCollapsible({
      initialCollapsed,
      headProps,
    });

    useCollapsibleSearchQuery({ isCollapsed, headProps });

    useEffect(() => {
      onToggle && onToggle(!isCollapsed);
    }, [isCollapsed]);

    const headClickHandler = useCallback(() => {
      toggleCollapsed();
      headProps.to && navigate(headProps.to);
    }, []);

    return (
      <div ref={ref} {...refineProps(props)}>
        <StyledCollapsible.Head onClick={headClickHandler}>
          <div>
            <Chevron direction={isCollapsed ? "bottom" : "top"} />
          </div>
          <p>{headProps.children}</p>
        </StyledCollapsible.Head>
        <StyledCollapsible.Body>
          <CollapsibleContext.Provider value={isCollapsed}>
            {details}
          </CollapsibleContext.Provider>
        </StyledCollapsible.Body>
      </div>
    );
  },
);

const Collapsible = Object.assign(_Collapsible, {
  Header: createGhostComponent<CollapsibleHeadProps>(),
  Details: Collapsible_Details,
});

export default Collapsible;
