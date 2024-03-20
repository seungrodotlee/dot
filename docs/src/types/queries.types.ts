export type RawIndexContent = {
    standalone: string | null;
    category: string | null;
    pages: string[] | null;
  };

export type RawIndex = {
  title: string;
  prefix: string;
  contents: RawIndexContent[];
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