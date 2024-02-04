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
import { collapsibleDetailsCSS, collapsibleListCSS, collapsibleSizerCSS } from "./collapsible.styles";

type CollapsibleDetailsProps = ComponentPropsWith<"div", {
  isCollapsed?: boolean;
}>;

const Collapsible_Details = forwardRef<HTMLDivElement, CollapsibleDetailsProps>(
  ({ children, css: _css, ...props }, ref) => {
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
      <div
        ref={ref}
        {...refineProps(props)}
        css={[collapsibleDetailsCSS, _css]}
      >
        <div
          ref={sizerRef}
          css={[
            collapsibleSizerCSS(height, isAnimationInited),
          ]}
        >
          <ul css={collapsibleListCSS}>{children}</ul>
        </div>
      </div>
    );
  },
);

export default Collapsible_Details;
