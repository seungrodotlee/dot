import React, { ComponentPropsWith, useState } from "react";

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
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const toggleSidebar = (value: boolean) => () => {
    setSidebarVisible(value);
  };

  return (
    <StyledLayout.Root sidebarVisible={sidebarVisible} {...refineProps(props)}>
      <GlobalStyles />
      <OverlayProvider>
        <LayoutProvider
          value={{
            withoutSidebar,
          }}
        >
          {!withoutSidebar && <SideBar onClose={toggleSidebar(false)} />}
          <StyledLayout.Main withoutSidebar={withoutSidebar}>
            <Header onMenuClick={toggleSidebar(true)} />
            <StyledLayout.Content>{children}</StyledLayout.Content>
          </StyledLayout.Main>
        </LayoutProvider>
      </OverlayProvider>
    </StyledLayout.Root>
  );
};

export default Layout;
