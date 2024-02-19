import tw, { styled } from 'twin.macro';

export const StyledCollapsible = {
  Head: styled.button`
    ${tw`flex items-center w-full`}
    & > div {
      ${tw`mr-2`}
    }
  `,
  Body: styled.div`${tw`
    flex relative ml-[5px] pl-[5px] border-l-2 border-[#32394d]
  `}`,
  Details: {
    Root: styled.div`${tw`pl-2 overflow-hidden`}`,
    Sizer: styled.div<{ height: number, isAnimationInited: boolean}>`
      max-height: ${({ height }) => height}px;  
      ${({ isAnimationInited }) => isAnimationInited && tw`transition-all duration-300 ease-in-out`}
    `,
    List: styled.ul`${tw`flex flex-col`}`
  }
}