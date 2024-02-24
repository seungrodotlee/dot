import { ComponentPropsWith, useEffect, useRef } from "react";

import { useDynamicGeul } from "@dot/geul-react";

import { refineProps } from "../../../../../utils";

import { StyledGeulLabel } from "./geul-label.styles";

const GeulLabel = (props: ComponentPropsWith<"div">) => {
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
    <StyledGeulLabel.Root {...refineProps(props)}>
      <p>&nbsp;</p>
      <StyledGeulLabel.Title>{geul}</StyledGeulLabel.Title>
    </StyledGeulLabel.Root>
  );
};

export default GeulLabel;
