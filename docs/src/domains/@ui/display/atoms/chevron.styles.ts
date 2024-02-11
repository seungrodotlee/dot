import tw, { styled } from "twin.macro";

const skew = tw`skew-y-[36deg]`;
const skewReverse = tw`-skew-y-[36deg]`;

export const StyledChevron = {
  Root: styled.div<{ isBottom: boolean }>`
    ${tw`flex transition-all duration-300`}
    ${({ isBottom }) => isBottom ? tw`pt-1 pb-0` : tw`pt-0 pb-1`}
  `,
  Partition: styled.div<{ isReverse: boolean }>`
    ${tw`w-1.5 h-0.5 bg-neutral-300 transition-all duration-300`}
    ${({ isReverse }) => isReverse ? skewReverse : skew}
  `
}