import { Link } from "gatsby";
import tw, { styled } from "twin.macro";

const Logo_Root = styled(Link)(tw`flex items-center font-black`);

const Logo_Dot = styled.div(tw`w-4 h-4 rounded-full bg-white mr-1`);

export const StyledLogo = {
  Root: Logo_Root,
  Dot: Logo_Dot,
}