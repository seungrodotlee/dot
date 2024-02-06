import { ComponentPropsWith } from "react";

import { MDXProvider } from "@mdx-js/react";
import { GlobalStyles } from "twin.macro";
import "@docsearch/css/dist/style.css";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import Header from "./header";
import SideBar from "./side-bar.component";
import StyledLayout from "./layout.styles";

const MDXLayout = ({ children, ...props }: ComponentPropsWith<"div">) => {
  return (
    <StyledLayout.Root {...refineProps(props)}>
      <GlobalStyles />
      <OverlayProvider>
        <SideBar />
        <StyledLayout.Main>
          <Header />
          <MDXProvider>
            <div className="doc">{children}</div>
          </MDXProvider>
        </StyledLayout.Main>
      </OverlayProvider>
    </StyledLayout.Root>
  );
};

export default MDXLayout;
