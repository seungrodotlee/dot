import tw, { styled } from "twin.macro";

export const StyledOverlay = {
  Root: styled.div`
    ${tw`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-50`}
    & > * {
      ${tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    }
  `,
}