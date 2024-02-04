import { ComponentPropsWith, useEffect, useRef } from "react";

import { useDynamicGeul } from "@dot/geul-react";

import { StyledLogo } from "./logo.styles";

const Logo = (props: ComponentPropsWith<"div">) => {
  const isWriting = useRef(true);
  const { geul, isRunning, run } = useDynamicGeul("", {
    speed: 50,
    decomposeOnBackspace: true,
  });

  useEffect(() => {
    if (isRunning) return;

    setTimeout(
      () => {
        run(isWriting.current ? "글.제이에스" : "");
        isWriting.current = !isWriting.current;
      },
      isWriting.current ? 1000 : 4000,
    );
  }, [isRunning]);

  return (
    <StyledLogo.Root {...props}>
      <p>&nbsp;</p>
      <StyledLogo.Title>{geul}</StyledLogo.Title>
    </StyledLogo.Root>
  );
};

export default Logo;
