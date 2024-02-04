import { ComponentPropsWith } from "react";

import { MDXProvider } from "@mdx-js/react";
import { GlobalStyles } from "twin.macro";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import Header from "./header";
import SideBar from "./side-bar.component";
import StyledLayout from "./layout.styles";

const MDXLayout = ({ children, css, ...props }: ComponentPropsWith<"div">) => {
  return (
    <>
      <GlobalStyles />
      <StyledLayout.Root css={css} {...refineProps(props)}>
        <OverlayProvider>
          <SideBar />
          <StyledLayout.Main>
            <Header />
            <MDXProvider>{children}</MDXProvider>
          </StyledLayout.Main>
        </OverlayProvider>
      </StyledLayout.Root>
    </>
  );
};

export default MDXLayout;
