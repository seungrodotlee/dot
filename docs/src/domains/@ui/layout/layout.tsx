import { ComponentPropsWith } from "react";

import { GlobalStyles } from "twin.macro";
import "@docsearch/css/dist/style.css";
import "../../../styles/docsearch.css";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import SideBar from "./side-bar.component";
import Header from "./header";
import StyledLayout from "./layout.styles";
import { LayoutProvider } from "./layout.context";

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
        <LayoutProvider
          value={{
            withoutSidebar,
          }}
        >
          {!withoutSidebar && <SideBar />}
          <StyledLayout.Main withoutSidebar={withoutSidebar}>
            <Header />
            <StyledLayout.Content>{children}</StyledLayout.Content>
          </StyledLayout.Main>
        </LayoutProvider>
      </OverlayProvider>
    </StyledLayout.Root>
  );
};

export default Layout;
