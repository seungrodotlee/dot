import { ComponentPropsWith } from "react";

import { GlobalStyles } from "twin.macro";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import SideBar from "./side-bar.component";
import Header from "./header";
import StyledLayout from "./layout.styles";

const Layout = ({ children, ...props }: ComponentPropsWith<"div">) => {
  return (
    <>
      <StyledLayout.Root {...refineProps(props)}>
        <GlobalStyles />
        <OverlayProvider>
          <SideBar />
          <StyledLayout.Main>
            <Header />
            <div>{children}</div>
          </StyledLayout.Main>
        </OverlayProvider>
      </StyledLayout.Root>
    </>
  );
};

export default Layout;
