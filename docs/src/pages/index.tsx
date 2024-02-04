import * as React from "react";
import "twin.macro";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../domains/@ui/layout/layout";

const IndexPage: React.FC<PageProps> = () => {
  return <Layout>하이~</Layout>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
