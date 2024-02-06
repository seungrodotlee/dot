import { ComponentPropsWith } from "react";

import { GlobalStyles } from "twin.macro";
import "@docsearch/css/dist/style.css";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import SideBar from "./side-bar.component";
import Header from "./header";
import StyledLayout from "./layout.styles";

const Layout = ({
  children,
  withoutSidebar,
  ...props
}: ComponentPropsWith<"div"> & {
  withoutSidebar?: boolean;
}) => {
  return (
    <StyledLayout.Root {...refineProps(props)}>
      <GlobalStyles />
      <OverlayProvider>
        {!withoutSidebar && <SideBar />}
        <StyledLayout.Main>
          <Header />
          {children}
        </StyledLayout.Main>
      </OverlayProvider>
    </StyledLayout.Root>
  );
};

export default Layout;
