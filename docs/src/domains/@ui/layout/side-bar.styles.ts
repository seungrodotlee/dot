import tw, { styled } from "twin.macro";

import Logo from "./logo";

const StyledSidebar = {
  Root: styled.div`
    ${tw`min-w-[9rem] h-full p-2 pr-6`}
  `,
  Body: styled.div`
    ${tw`h-full pl-4 pr-8 py-4 bg-neutral-100 rounded-sm`}
  `,
  Logo: styled(Logo)`${tw`mb-8`}`,
  Menus: styled.div`${tw`text-neutral-500`}`,
  Menu: styled.div`${tw`flex`}`,
  DotWrap: styled.div`${tw`flex justify-center items-center w-3 mr-2`}`,
  Dot: styled.div`${tw`w-1 h-1 rounded-full bg-neutral-300`}`
}

export default StyledSidebar;