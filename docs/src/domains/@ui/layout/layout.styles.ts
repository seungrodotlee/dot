import tw, { styled } from "twin.macro";

const StyledLayout = {
  Root: styled.div`${tw`flex w-full h-full`}`,
  Main: styled.div`flex flex-col flex-grow overflow-y-auto`
}

export default StyledLayout;