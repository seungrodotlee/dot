import { ComponentPropsWith } from "react";

export type CollapsibleProps = ComponentPropsWith<
  "div",
  {
    initialCollapsed?: boolean;
    onToggle?: (isOpened: boolean) => void;
  }
>;

export type CollapsibleDetailsProps = ComponentPropsWith<
  "div",
  {
    isCollapsed?: boolean;
  }
>;

export type CollapsibleHeadProps = Pick<
  ComponentPropsWith<"div">,
  "children" | "css"
> & {
  to?: string;
};

export type UseCollapsibleSearchQueryProps = {
  isCollapsed: boolean,
  headProps: CollapsibleHeadProps
};

export type UseCollapsibleProps = {
  initialCollapsed?: boolean,
  headProps: CollapsibleHeadProps
}