import { ComponentPropsWith } from "react";

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