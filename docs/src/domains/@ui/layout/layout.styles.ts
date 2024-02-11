import tw, { styled } from "twin.macro";

const StyledLayout = {
  Root: styled.div`${tw`flex w-full h-full`}`,
  Main: styled.div<{ withoutSidebar?: boolean }>`
    ${tw`flex flex-col grow overflow-y-auto`}
    ${({ withoutSidebar }) => withoutSidebar ? tw`mx-4` : tw`mr-4`}
  `,
  Content: styled.div`
    ${tw`grow border border-black mb-4`}

    & .doc {
      ${tw`px-4 py-8`}
    }
  `
}

export default StyledLayout;