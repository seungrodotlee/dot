import React, { useCallback, useState } from "react";
import { Helmet } from "react-helmet";

import { MDXProvider } from "@mdx-js/react";
import "@docsearch/css/dist/style.css";
import { GlobalStyles } from "twin.macro";
import { graphql } from "gatsby";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";
import CodeBlock from "../render-mdx/code-block/code-block.component";
import Heading from "../render-mdx/heading/heading.component";

import Header from "./header/header.component";
import Sidebar from "./sidebar/sidebar.component";
import StyledLayout from "./layout.styles";
import { LayoutProvider } from "./layout.context";
import "../../../styles/markdown.css";
import { MDXLayoutProps } from "./layout.types";

const MDXLayout = ({ data, children, ...props }: MDXLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const toggleSidebar = useCallback(
    (value: boolean) => () => {
      setSidebarVisible(value);
    },
    [],
  );

  return (
    <StyledLayout.Root sidebarVisible={sidebarVisible} {...refineProps(props)}>
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
          <Sidebar onClose={toggleSidebar(false)} />
          <StyledLayout.Main>
            <Header onMenuClick={toggleSidebar(true)} />
            <StyledLayout.Content>
              <MDXProvider
                components={{
                  h1: (props) => <Heading as="h1" {...props} />,
                  h2: (props) => <Heading as="h2" {...props} />,
                  h3: (props) => <Heading as="h3" {...props} />,
                  h4: (props) => <Heading as="h4" {...props} />,
                  h5: (props) => <Heading as="h5" {...props} />,
                  h6: (props) => <Heading as="h6" {...props} />,
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
