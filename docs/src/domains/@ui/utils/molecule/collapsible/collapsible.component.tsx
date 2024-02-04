import {
  ComponentPropsWith,
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";

import { append, pipe, split, join, filter } from "@fxts/core";
import { navigate } from "gatsby";
import { match } from "ts-pattern";

import { refineProps } from "../../../../../utils";
import Chevron from "../../../display/atoms/chevron";
import useChild from "../../../../@shared/use-child/use-child.hook";
import useChildProps from "../../../../@shared/use-child/use-child-props.hook";
import createGhostComponent from "../../../../@shared/create-component/create-ghost-component.creator";

import Collapsible_Details from "./collapsible-details.component";
import { StyledCollapsible } from "./collapsible.styles";

export const CollapsibleContext = createContext<boolean>(false);

const getModifiedOpenedMenus = (
  actor: (it: IterableIterator<string>) => IterableIterator<string>,
  search: URLSearchParams,
) => {
  return pipe(search.get("openedMenus") || "", split(","), actor, join(","));
};

const appendToOpenedMenus =
  (title: string) =>
  ({ search }: Record<"search", URLSearchParams>) => {
    search.set(
      "openedMenus",
      getModifiedOpenedMenus((menus) => append(title, menus), search),
    );
    return search;
  };

const deleteFromOpenedMenus =
  (title: string) =>
  ({ search }: Record<"search", URLSearchParams>) => {
    pipe(
      getModifiedOpenedMenus(
        (menus) => filter((menu) => menu !== title, menus),
        search,
      ),
      (updatedOpenedMenus) =>
        updatedOpenedMenus === ""
          ? search.delete("openedMenus")
          : search.set("openedMenus", updatedOpenedMenus),
    );
    return search;
  };

type CollapsibleProps = ComponentPropsWith<
  "div",
  {
    initialCollapsed?: boolean;
  }
>;

const _Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ initialCollapsed, children, ...props }, ref) => {
    const [isCollapsed, setCollapsed] = useState<boolean>(
      initialCollapsed ?? true,
    );

    const { getChild } = useChild(children);
    const { getChildProps } = useChildProps(children);

    const head = getChildProps(Collapsible.Header);

    const details = getChild(Collapsible.Details);

    const headClickHandler = useCallback(() => {
      setCollapsed((prev) => !prev);
      head.to && navigate(head.to);
    }, []);

    useEffect(() => {
      if (
        new URLSearchParams(location.search)
          .get("openedMenus")
          ?.includes(head.children)
      )
        setCollapsed(false);
    }, [head]);

    useEffect(() => {
      pipe(
        match({ isCollapsed, search: new URLSearchParams(location.search) })
          .with(
            {
              isCollapsed: false,
            },
            appendToOpenedMenus(head.children),
          )
          .otherwise(deleteFromOpenedMenus(head.children)),
        (search) =>
          location.search.replace("?", "") !== search.toString() &&
          window.history.pushState(null, "", `?${search.toString()}`),
      );
    }, [isCollapsed]);

    return (
      <div ref={ref} {...refineProps(props)}>
        <StyledCollapsible.Head onClick={headClickHandler}>
          <Chevron direction={isCollapsed ? "bottom" : "top"} />
          <p>{head.children}</p>
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

type CollapsibleHeadProps = {
  children: string;
  to?: string;
};

const Collapsible = Object.assign(_Collapsible, {
  Header: createGhostComponent<CollapsibleHeadProps>(),
  Details: Collapsible_Details,
});

export default Collapsible;
