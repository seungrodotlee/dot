import { ComponentPropsWith } from "react";

export type RawIndex = {
  standalone: string | null;
  category: string | null;
  pages: string[] | null;
};

export type ContentsIndexQuery = {
  allYaml: {
    edges: {
      node: {
        index: RawIndex[];
      };
    }[];
  };
};

export type RawContent = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
  };
};

export type ContentsQuery = {
  allMdx: {
    nodes: RawContent[];
  };
};

export type Page = Record<"id" | "title" | "slug", string>;

export type MappedCategories = Record<
  string,
  {
    overview: Page;
    pages: Record<string, Page>;
  }
>;

export class Standalone {
  standalone: Page;

  constructor(standalone: Page) {
    this.standalone = standalone;
  }
}

export class Category {
  category: string;
  pages: Page[];

  constructor(category: string, pages: Page[]) {
    this.category = category;
    this.pages = pages;
  }
}

export type SidebarProps = ComponentPropsWith<"div"> & {
  onClose: () => void;
};