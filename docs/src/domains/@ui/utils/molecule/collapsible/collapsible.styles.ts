import tw, { css } from 'twin.macro';

export const collapsibleHeadStyle = css`
  ${tw`flex items-center w-full`}
  & > div {
    ${tw`mr-2`}
  }
`;

export const collapsibleDetailsWrapStyle = tw`
  flex relative ml-[5px] pl-[5px] border-l-2 border-neutral-300
`

export const collapsibleDetailsCSS = tw`pl-2 overflow-hidden`;

export const collapsibleSizerCSS = (height: number, isAnimationInited: boolean) => 
css`
  max-height: ${height}px;
  ${isAnimationInited && tw`transition-all duration-300 ease-in-out`}
`;

export const collapsibleListCSS = tw`flex flex-col`;