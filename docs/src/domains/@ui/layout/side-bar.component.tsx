import { ComponentPropsWith, useMemo } from "react";

import { graphql, navigate, useStaticQuery } from "gatsby";
import { map, pipe, prepend, reduce, split, toArray } from "@fxts/core";
import { P, match } from "ts-pattern";

import { refineProps } from "../../../utils";
import Collapsible from "../utils/molecule/collapsible/collapsible.component";

import StyledSidebar from "./side-bar.styles";

type RawIndex = {
  standalone: string | null;
  category: string | null;
  pages: string[] | null;
};

type ContentsIndexQuery = {
  allYaml: {
    edges: {
      node: {
        index: RawIndex[];
      };
    }[];
  };
};

type RawContent = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
  };
};

type ContentsQuery = {
  allMdx: {
    nodes: RawContent[];
  };
};

type Page = Record<"id" | "title" | "slug", string>;

type MappedCategories = Record<
  string,
  {
    overview: Page;
    pages: Record<string, Page>;
  }
>;

class Standalone {
  standalone: Page;

  constructor(standalone: Page) {
    this.standalone = standalone;
  }
}

class Category {
  category: string;
  pages: Page[];

  constructor(category: string, pages: Page[]) {
    this.category = category;
    this.pages = pages;
  }
}

const splitIfSlashIncluded = (title: string) => {
  return match(title)
    .with(P.string.includes("/"), () => [...split("/", title)])
    .otherwise(() => [title]);
};

const accumulatePageToCategories =
  (result: MappedCategories, id: string, slug: string) =>
  ([category, splittedTitle]: string[]) => {
    return match(splittedTitle)
      .returnType<MappedCategories>()
      .with(P.union(P.nullish, "overview"), () => ({
        ...result,
        [category]: {
          overview: { id, title: splittedTitle ?? category, slug },
          pages: result[category]?.pages || {},
        },
      }))
      .otherwise(() => ({
        ...result,
        [category]: {
          overview: result[category]?.overview,
          pages: {
            ...(result[category]?.pages || {}),
            [splittedTitle]: { id, title: splittedTitle, slug },
          },
        },
      }));
  };

const categoriesAccumulator = (
  result: MappedCategories,
  { id, frontmatter: { slug, title } }: RawContent,
) => {
  return pipe(
    title,
    splitIfSlashIncluded,
    accumulatePageToCategories(result, id, slug),
  );
};

const categoriesMapper =
  (accumulated: MappedCategories) => (standaloneOrCategory: RawIndex) => {
    return match(standaloneOrCategory)
      .returnType<Standalone | Category>()
      .with(
        { standalone: P.string },
        ({ standalone }) => new Standalone(accumulated[standalone].overview),
      )
      .with(
        { category: P.string, pages: P.array(P.string) },
        ({ category, pages }) =>
          new Category(
            category,
            pipe(
              pages,
              map((page) => accumulated[category].pages[page]),
              (mappedPages) =>
                accumulated[category].overview
                  ? prepend(accumulated[category].overview, mappedPages)
                  : mappedPages,
              toArray,
            ),
          ),
      )
      .run();
  };

const getOrderedCategories =
  (index: RawIndex[]) => (accumulated: MappedCategories) => {
    return pipe(index, map(categoriesMapper(accumulated)), toArray);
  };

const SideBar = (props: ComponentPropsWith<"div">) => {
  const data = useStaticQuery<ContentsIndexQuery & ContentsQuery>(graphql`
    query {
      allYaml {
        edges {
          node {
            index {
              standalone
              category
              pages
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

  const categories = useMemo(() => {
    return pipe(
      reduce<RawContent, MappedCategories>(
        categoriesAccumulator,
        {},
        data.allMdx.nodes,
      ),
      getOrderedCategories(data.allYaml.edges[0].node.index),
    );
  }, [data]);

  return (
    <StyledSidebar.Root {...refineProps(props)}>
      <StyledSidebar.Body>
        <StyledSidebar.Logo />
        <StyledSidebar.Menus>
          {categories.map((standaloneOrCategory) =>
            match(standaloneOrCategory)
              .with(P.instanceOf(Standalone), ({ standalone }) => (
                <StyledSidebar.Menu key={standalone.title}>
                  <StyledSidebar.DotWrap>
                    <StyledSidebar.Dot />
                  </StyledSidebar.DotWrap>
                  <button
                    onClick={() =>
                      navigate(`${standalone.slug}/${location.search}`)
                    }
                  >
                    {standalone.title}
                  </button>
                </StyledSidebar.Menu>
              ))
              .otherwise(({ category, pages }) => (
                <div key={category}>
                  <Collapsible>
                    <Collapsible.Header>{category}</Collapsible.Header>
                    <Collapsible.Details>
                      {pages.map(({ id, title, slug }) => (
                        <button
                          key={id}
                          onClick={() => navigate(`${slug}/${location.search}`)}
                        >
                          {title}
                        </button>
                      ))}
                    </Collapsible.Details>
                  </Collapsible>
                </div>
              )),
          )}
        </StyledSidebar.Menus>
      </StyledSidebar.Body>
    </StyledSidebar.Root>
  );
};

export default SideBar;
