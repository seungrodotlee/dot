import {
  ComponentPropsWith,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { refineProps } from "../../../../../utils";

import { CollapsibleContext } from "./collapsible.component";
import { StyledCollapsible } from "./collapsible.styles";

type CollapsibleDetailsProps = ComponentPropsWith<
  "div",
  {
    isCollapsed?: boolean;
  }
>;

const Collapsible_Details = forwardRef<HTMLDivElement, CollapsibleDetailsProps>(
  ({ children, ...props }, ref) => {
    const isCollapsed = useContext(CollapsibleContext);
    const [isAnimationInited, setAnimationInited] = useState<boolean>(false);
    const sizerRef = useRef<HTMLDivElement>(null);
    const height = useMemo(
      () => (isCollapsed ? 0 : sizerRef.current?.scrollHeight || 0),
      [isCollapsed],
    );

    useEffect(() => {
      setTimeout(() => setAnimationInited(true), 100);
    }, []);

    return (
      <StyledCollapsible.Details.Root ref={ref} {...refineProps(props)}>
        <StyledCollapsible.Details.Sizer
          height={height}
          isAnimationInited={isAnimationInited}
          ref={sizerRef}
        >
          <StyledCollapsible.Details.List>
            {children}
          </StyledCollapsible.Details.List>
        </StyledCollapsible.Details.Sizer>
      </StyledCollapsible.Details.Root>
    );
  },
);

export default Collapsible_Details;
