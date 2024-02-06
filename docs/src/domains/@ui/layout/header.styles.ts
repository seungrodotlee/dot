import { Link } from "gatsby";
import tw, { styled } from "twin.macro";

export const StyledHeader = {
  Root: styled.div`${tw`w-full pt-2`}`,
  Body: styled.div`
    ${tw`
      flex items-center justify-between w-full px-6 py-2 border border-black border-b-0
    `}
  `,
  Left: styled.div`${tw`grow`}`,
  Right: styled.div`
    ${tw`flex items-center justify-end`}
    & > * {
      ${tw`ml-4`}
    }
  `,
  Link: styled(Link)`${tw`text-2xl`}`
}