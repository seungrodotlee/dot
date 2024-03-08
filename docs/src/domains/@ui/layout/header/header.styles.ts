import { Link } from "gatsby";
import tw, { styled } from "twin.macro";

const Header_Root = styled.div(tw`w-full pt-4`);

const Header_Body = styled.div(tw`
  flex items-center justify-between w-full px-6 py-4 lg:py-2 border border-white border-b-0
`);

const Header_Left = styled.div({
  ...tw`flex items-end grow`,
  "> button": tw`text-xl mr-2 lg:hidden`,
  "> div": tw`grow`,
})


const Header_Right = styled.div({
  ...tw`flex flex-row-reverse lg:flex-row items-center justify-end`,
  "> *": tw`ml-4`,
})

const Header_Link = styled(Link)(tw`text-2xl`)

export const StyledHeader = {
  Root: Header_Root,
  Body: Header_Body,
  Left: Header_Left,
  Right: Header_Right,
  Link: Header_Link,
}