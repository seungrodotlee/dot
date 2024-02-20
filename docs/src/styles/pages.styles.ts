import tw, { styled } from "twin.macro";

export const StyledIndex = {
  Root: styled.div`
    ${[tw`h-full flex flex-col justify-center items-center font-bold lg:text-3xl`]}
    & > div {
      ${tw`w-full`}
    }
  `,
  Title: styled.div<{ transformed: boolean }>`
    ${[tw`flex flex-col lg:flex-row justify-center items-center p-4 font-black border-b border-white text-lg md:text-5xl xl:text-[4rem]`]}
    
    &:hover {
      ${tw`bg-white text-[#0f1020]`}
    }

    & > div {
    ${tw`flex justify-center items-center lg:leading-[1.2]`}
    }

    & * {
      pointer-events: none;
      white-space: pre;
    }

    & .trans-shrink {
      transition: font-size 0.4s cubic-bezier(0, 0.2, 1, 0.2);
      font-size: ${({ transformed }) => transformed ? "1em" : 0};
    }

    & .trans-hidden {
      ${({ transformed }) => transformed ? "" : "display: none;"}
    }

    & .trans-show {
      ${({ transformed }) => transformed ? "display: none;" : ""}
    }
  `,
  ContentWrap: styled.div`
    ${[tw`grow flex justify-between flex-col lg:flex-row`]}
  `,
  Content: styled.p`
    ${tw`lg:grow w-full p-4`}
  `,
  Links: styled.div`
    ${tw`flex flex-col items-end lg:min-w-[320px] grow lg:grow-0 border-t lg:border-t-0 lg:border-l border-white`}
    & > a {
      ${tw`w-full px-4 py-2 border-b border-white`}

      &:hover {
        ${tw`bg-white text-[#0f1020]`}
      }
    }
  `
}