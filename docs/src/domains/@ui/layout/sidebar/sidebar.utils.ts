import { map, pipe, prepend, split, toArray } from "@fxts/core";
import { P, match } from "ts-pattern";

import { Category, MappedCategories, RawContent, RawIndex, RawIndexContent, Standalone } from "./sidebar.types";

const splitIfSlashIncluded = (title: string) => {
  return match(title)
    .returnType<string[]>()
    .with(P.string.includes("/"), () => pipe(title, split("/"), toArray))
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

export const categoriesAccumulator = (
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
  (accumulated: MappedCategories) => (standaloneOrCategory: RawIndexContent) => {
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

export const getOrderedCategories =
  (index: RawIndex["contents"]) => (accumulated: MappedCategories) => {
    return pipe(index, map(categoriesMapper(accumulated)), toArray);
  };