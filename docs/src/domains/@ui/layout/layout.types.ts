import { ComponentPropsWith } from "react";

export type LayoutProps = ComponentPropsWith<"div"> & {
  withoutSidebar?: boolean;
};

export type MDXLayoutProps = ComponentPropsWith<"div"> &
  Record<
    "data",
    {
      mdx: {
        frontmatter: {
          title: string;
        };
      };
    }
  >;