import { useMemo } from "react";

import { graphql, useStaticQuery } from "gatsby";
import { P, match } from "ts-pattern";
import { FaArrowLeft } from "react-icons/fa";

import { isWindow, refineProps } from "../../../../utils";
import Collapsible from "../../utils/molecule/collapsible/collapsible.component";
import Logo from "../logo/logo.component";

import StyledSidebar from "./sidebar.styles";
import {
  ContentsIndexQuery,
  ContentsQuery,
  SidebarProps,
  Standalone,
} from "./sidebar.types";
import { useSidebarCategories } from "./use-sidebar-categories.hook";

const Sidebar = ({ onClose, ...props }: SidebarProps) => {
  const lib = useMemo(
    () => (isWindow() ? location.pathname.split("/")[1] : null),
    [],
  );

  const data = useStaticQuery<ContentsIndexQuery & ContentsQuery>(graphql`
    query {
      allYaml {
        edges {
          node {
            index {
              lib
              contents {
                standalone
                category
                pages
              }
            }
          }
        }
      }

      allMdx {
        nodes {
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);

  const categories = useSidebarCategories(data, lib);

  const current = useMemo(
    () => (isWindow() ? location.pathname.replace(/\/$/, "") : null),
    [],
  );

  return (
    <StyledSidebar.Root className="sidebar" {...refineProps(props)}>
      <StyledSidebar.Body>
        <StyledSidebar.LogoWrap>
          <Logo />
          <button onClick={onClose}>
            <FaArrowLeft />
          </button>
        </StyledSidebar.LogoWrap>
        <div>
          {categories?.map((standaloneOrCategory) =>
            match(standaloneOrCategory)
              .with(P.instanceOf(Standalone), ({ standalone }) => (
                <StyledSidebar.Menu key={standalone.title}>
                  <StyledSidebar.DotWrap>
                    <StyledSidebar.Dot />
                  </StyledSidebar.DotWrap>
                  <StyledSidebar.Link
                    active={standalone.slug === current}
                    to={`${standalone.slug}/${isWindow() ? location.search : ""}`}
                  >
                    {standalone.title}
                  </StyledSidebar.Link>
                </StyledSidebar.Menu>
              ))
              .otherwise(({ category, pages }) => (
                <div key={category}>
                  <Collapsible>
                    <Collapsible.Header>{category}</Collapsible.Header>
                    <Collapsible.Details>
                      {pages.map(({ id, title, slug }) => (
                        <StyledSidebar.Link
                          key={id}
                          active={slug === current}
                          to={`${slug}/${isWindow() ? location.search : ""}`}
                        >
                          {title}
                        </StyledSidebar.Link>
                      ))}
                    </Collapsible.Details>
                  </Collapsible>
                </div>
              )),
          )}
        </div>
      </StyledSidebar.Body>
    </StyledSidebar.Root>
  );
};

export default Sidebar;
