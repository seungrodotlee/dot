import { ComponentPropsWith } from "react";
import { Helmet } from "react-helmet";

import { MDXProvider } from "@mdx-js/react";
import "@docsearch/css/dist/style.css";
import { GlobalStyles } from "twin.macro";
import { graphql } from "gatsby";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";
import CodeBlock from "../render-mdx/code-block.component";

import Header from "./header";
import SideBar from "./side-bar.component";
import StyledLayout from "./layout.styles";
import { LayoutProvider } from "./layout.context";
import "../../../styles/markdown.css";

const MDXLayout = ({
  data,
  children,
  ...props
}: ComponentPropsWith<"div"> &
  Record<
    "data",
    {
      mdx: {
        frontmatter: {
          title: string;
        };
      };
    }
  >) => {
  return (
    <StyledLayout.Root {...refineProps(props)}>
      <Helmet>
        <title>{data.mdx.frontmatter.title}</title>
      </Helmet>
      <GlobalStyles />
      <OverlayProvider>
        <LayoutProvider
          value={{
            withoutSidebar: false,
          }}
        >
          <SideBar />
          <StyledLayout.Main>
            <Header />
            <StyledLayout.Content>
              <MDXProvider
                components={{
                  pre: CodeBlock,
                }}
              >
                <div className="doc">{children}</div>
              </MDXProvider>
            </StyledLayout.Content>
          </StyledLayout.Main>
        </LayoutProvider>
      </OverlayProvider>
    </StyledLayout.Root>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

export default MDXLayout;
