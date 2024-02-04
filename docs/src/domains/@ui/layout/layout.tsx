import { ComponentProps } from "react";

import classNames from "classnames";
import { GlobalStyles } from "twin.macro";

import { refineProps } from "../../../utils";
import OverlayProvider from "../overlay/overlay.provider";

import SideBar from "./side-bar.component";
import Header from "./header";



const Layout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={classNames("flex w-full h-full", className)}
      {...refineProps(props)}
    >
      <GlobalStyles />
      <OverlayProvider>
        <SideBar />
        <div className="flex flex-col flex-grow overflow-y-auto">
          <Header />
          <div>{children}</div>
        </div>
      </OverlayProvider>
    </div>
  );
};

export default Layout;
