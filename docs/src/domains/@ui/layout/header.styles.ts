import { Link } from "gatsby";
import tw, { styled } from "twin.macro";

export const StyledHeader = {
  Root: styled.div`${tw`w-full pt-4`}`,
  Body: styled.div`
    ${tw`
      flex items-center justify-between w-full px-6 py-4 lg:py-2 border border-white border-b-0
    `}
  `,
  Left: styled.div`
    ${tw`flex items-end grow`}
    & > button {
      ${tw`text-xl mr-2 lg:hidden`}
    }
    & > div {
      ${tw`grow`}
    }
  `,
  Right: styled.div`
    ${tw`flex flex-row-reverse lg:flex-row items-center justify-end`}
    & > * {
      ${tw`ml-4`}
    }
  `,
  Link: styled(Link)`${tw`text-2xl`}`
}