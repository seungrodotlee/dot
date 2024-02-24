import React, { useCallback, useState } from "react";

import { GlobalStyles } from "twin.macro";
import "@docsearch/css/dist/style.css";
import "../../../styles/docsearch.css";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import Sidebar from "./sidebar/sidebar.component";
import Header from "./header/header.component";
import StyledLayout from "./layout.styles";
import { LayoutProvider } from "./layout.context";
import { LayoutProps } from "./layout.types";

const Layout = ({ children, withoutSidebar, ...props }: LayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const toggleSidebar = useCallback(
    (value: boolean) => () => {
      setSidebarVisible(value);
    },
    [],
  );

  return (
    <StyledLayout.Root sidebarVisible={sidebarVisible} {...refineProps(props)}>
      <GlobalStyles />
      <OverlayProvider>
        <LayoutProvider
          value={{
            withoutSidebar,
          }}
        >
          {!withoutSidebar && <Sidebar onClose={toggleSidebar(false)} />}
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
