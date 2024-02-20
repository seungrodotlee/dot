import tw, { styled } from "twin.macro";

const StyledLayout = {
  Root: styled.div<{ sidebarVisible: boolean }>`
    ${tw`flex w-full h-full`}
    & .sidebar {
      ${({ sidebarVisible }) => sidebarVisible ? "" : tw`hidden lg:block`}
    }
  `,
  Main: styled.div<{ withoutSidebar?: boolean }>`
    ${tw`flex flex-col grow overflow-y-auto`}
    ${({ withoutSidebar }) => withoutSidebar ? tw`mx-4` : tw`mx-4 lg:mr-4`}
  `,
  Content: styled.div`
    ${tw`grow border border-white mb-4 overflow-y-scroll`}

    & .doc {
      ${tw`px-4 py-8`}
    }
  `
}

export default StyledLayout;