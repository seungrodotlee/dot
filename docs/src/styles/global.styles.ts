import tw, { styled } from "twin.macro";

export const Styled = {
  FlexCenter: styled.div`${tw`flex justify-center items-center`}`,
  Mobile: {
    NewLine: styled.br`${tw`lg:hidden`}`
  }
}