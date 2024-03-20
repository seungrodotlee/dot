import { Link } from "gatsby";
import tw, { styled } from "twin.macro";
import isPropValid from "@emotion/is-prop-valid";

const Sidebar_Root = styled.div(
  tw`absolute lg:relative h-full p-4 pr-0 z-10`
);

const Sidebar_Body = styled.div(
  tw`h-full pl-4 pr-8 py-4 bg-[#161a24] border border-white border-r lg:border-r-0`
);

const Sidebar_LogoWrap = styled.div({
    ...tw`h-9 flex items-center justify-between mb-8`,
    "button": tw`text-xl`
});

const Sidebar_Menu = styled.div(tw`flex`);

const Sidebar_Link = styled("button", {
  shouldForwardProp: prop => isPropValid(prop)
})<{ active?: boolean }>(({ active }) => ({
  ...tw`flex items-center`,
  ...(active ? tw`font-bold` : {}),
  "::after": {
    content: "''",
    ...tw`w-2 h-2 bg-red-600 rounded-full ml-2`,
    ...(active ? tw`flex` : tw`hidden`),
  }
}));

const Sidebar_DotWrap = styled.div(tw`flex justify-center items-center w-3 mr-2`);

const Sidebar_Dot = styled.div(tw`w-1 h-1 mx-1 rounded-full bg-[#32394d]`);

const StyledSidebar = {
  Root: Sidebar_Root,
  Body: Sidebar_Body,
  LogoWrap: Sidebar_LogoWrap,
  Menu: Sidebar_Menu,
  Link: Sidebar_Link,
  DotWrap: Sidebar_DotWrap,
  Dot: Sidebar_Dot
}

export default StyledSidebar;