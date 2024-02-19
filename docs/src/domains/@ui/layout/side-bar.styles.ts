import { Link } from "gatsby";
import tw, { css, styled } from "twin.macro";
import isPropValid from "@emotion/is-prop-valid";


const StyledSidebar = {
  Root: styled.div`
    ${tw`h-full p-4 pr-0`}
  `,
  Body: styled.div`
    ${tw`h-full pl-4 pr-8 py-4 bg-[#161a24] border border-white border-r-0`}
  `,
  LogoWrap: styled.div`${tw`h-9 flex items-center mb-8`}`,
  Menu: styled.div
  `${tw`flex`}`,
  headerCSS: (active: boolean) => css`
    ${tw`flex items-center`}

    &::after {
      content: "";
      ${ active ? tw`flex` : tw`hidden` }
      ${tw`w-2 h-2 bg-red-600 rounded-full ml-2`}
    }
  `,
  Link: styled(Link, {
    shouldForwardProp: prop => isPropValid(prop)
  })<{ active?: boolean }>`
    ${tw`flex items-center`}
    ${({ active }) => active ? tw`font-bold` : ""}
    &::after {
      content: "";
      ${({ active }) => active ? tw`flex` : tw`hidden`}
      ${tw`w-2 h-2 bg-red-600 rounded-full ml-2`}
    }
  `,
  DotWrap: styled.div`${tw`flex justify-center items-center w-3 mr-2`}`,
  Dot: styled.div`${tw`w-1 h-1 mx-1 rounded-full bg-[#32394d]`}`
}

export default StyledSidebar;