import tw, { styled } from "twin.macro";

import { utilStyles } from "./global.styles";

export const StyledIndex = {
  Root: styled.div`
    ${[tw`h-full border border-black`, utilStyles.flex.col, utilStyles.flex.center, utilStyles.font.bold, utilStyles.font["3xl"]]}
    & > div {
      ${tw`w-full`}
    }
  `,
  Title: styled.div`${[tw`p-4`, utilStyles.font.black, utilStyles.font.size(20), utilStyles.decorate.underline]}`,
  ContentWrap: styled.div`
    ${[tw`grow`, utilStyles.flex.between]}
  `,
  Content: styled.p`
    ${tw`grow w-full`}
  `,
  Links: styled.div`
    ${tw`flex flex-col items-end min-w-[320px] border-l border-black`}
    & > a {
      ${tw`w-full px-4 py-2 border-b border-black`}
    }
  `
}