import { StyledLogo } from "./logo.styles";

const Logo = () => {
  return (
    <StyledLogo.Root to="/">
      <StyledLogo.Dot />
      DOT
    </StyledLogo.Root>
  );
};

export default Logo;
