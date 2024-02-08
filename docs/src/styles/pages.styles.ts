import tw, { styled } from "twin.macro";

import { utilStyles } from "./global.styles";

export const StyledIndex = {
  Root: styled.div`
    ${[tw`h-full border border-black`, utilStyles.flex.col, utilStyles.flex.center, utilStyles.font.bold, utilStyles.font["3xl"]]}
    & > div {
      ${tw`w-full`}
    }
  `,
  Title: styled.div<{ transformed: boolean }>`
    ${[tw`p-4`, utilStyles.flex.center, utilStyles.font.black, utilStyles.font.size(12), utilStyles.decorate.underline]}
    
    & > * {
      pointer-events: none;
      white-space: pre;
    }

    & > .trans-shrink {
      transition: font-size 0.4s cubic-bezier(0, 0.2, 1, 0.2);
      font-size: ${({ transformed }) => transformed ? "1em" : 0};
    }

    & > .trans-hidden {
      ${({ transformed }) => transformed ? "" : "display: none;"}
    }

    & > .trans-show {
      ${({ transformed }) => transformed ? "display: none;" : ""}
    }
  `,
  ContentWrap: styled.div`
    ${[tw`grow`, utilStyles.flex.between]}
  `,
  Content: styled.p`
    ${tw`grow w-full p-4`}
  `,
  Links: styled.div`
    ${tw`flex flex-col items-end min-w-[320px] border-l border-black`}
    & > a {
      ${tw`w-full px-4 py-2 border-b border-black`}
    }
  `
}