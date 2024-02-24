import { append, filter, join, pipe, split } from "@fxts/core";

export const getModifiedOpenedMenus = (
  actor: (it: IterableIterator<string>) => IterableIterator<string>,
  search: URLSearchParams,
) => {
  return pipe(search.get("openedMenus") || "", split(","), actor, join(","));
};

export const appendToOpenedMenus =
  (title: string) =>
  ({ search }: Record<"search", URLSearchParams>) => {
    search.set(
      "openedMenus",
      getModifiedOpenedMenus((menus) => append(title, menus), search),
    );
    return search;
  };

export const deleteFromOpenedMenus =
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