import tw, { styled } from "twin.macro"

const Heading_Root = styled.h1({
  "> a": {
    opacity: 0,
  },
  ":hover > a": {
    opacity: 1
  }
})

const Heading_Hash = styled.a(
  tw`font-bold bg-blue-600 ml-2`,
)

export const StyledHeading = {
  Root: Heading_Root,
  Hash: Heading_Hash
}