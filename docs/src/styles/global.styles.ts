import tw, { css, styled } from "twin.macro";

export const utilStyles = {
  flex: {
    col: tw`flex-col`,
    center: tw`flex items-center justify-center`,
    between: tw`flex justify-between`
  },
  font: {
    size: (value: number) => css`
      font-size: ${value * 0.25}rem;
      line-height: 1.25;
    `,
    xl: tw`text-xl`,
    "2xl": tw`text-2xl`,
    "3xl": tw`text-3xl`,
    "4xl": tw`text-4xl`, 
    black: tw`font-black`,
    bold: tw`font-bold`,
    thin: tw`font-light`
  },
  decorate: {
    underline: tw`border-b border-white`,
    divider: {
      left: tw`border-l border-white`,
      right: tw`border-r border-white`
    }
  }
}

export const Styled = {
  FlexCenter: styled.div`${utilStyles.flex.center}`,
}