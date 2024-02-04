import tw, { styled } from "twin.macro";

export const StyledHeader = {
  Root: styled.div`${tw`w-full p-2 pl-0 mb-3`}`,
  Body: styled.div`${tw`flex items-center justify-end w-full px-6 py-2 rounded-md border border-neutral-200`}`,
  Search: styled.button`
    ${tw`flex items-center px-4 py-1 rounded-full bg-neutral-100 border border-neutral-200 mr-4`}
    & > p {
      ${tw`mr-2`}
    }
    
    & > a {
      ${tw`text-2xl`}
    }
  `,
}