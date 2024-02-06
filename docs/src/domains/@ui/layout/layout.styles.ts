import tw, { styled } from "twin.macro";

const StyledLayout = {
  Root: styled.div`${tw`flex w-full h-full`}`,
  Main: styled.div`${tw`flex flex-col grow mx-4 overflow-y-auto`}`
}

export default StyledLayout;