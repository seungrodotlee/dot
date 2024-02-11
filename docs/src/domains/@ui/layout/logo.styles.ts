import { Link } from "gatsby";
import tw, { styled } from "twin.macro";

export const StyledLogo = {
  Root: styled(Link)`${tw`flex items-center font-black`}`,
  Dot: styled.div`${tw`w-4 h-4 rounded-full bg-black mr-1`}`
}