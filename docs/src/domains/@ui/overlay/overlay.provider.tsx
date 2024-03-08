import { Fragment, ReactNode, useMemo, useState } from "react";

import { every, not } from "@fxts/core";

import { OverlayContext } from "./overlay.context";
import { Overlay } from "./overlay.type";
import { StyledOverlay } from "./overlay.styles";

const OverlayProvider = ({ children }: Record<"children", ReactNode>) => {
  const overlayState = useState<Overlay>({});
  const [overlay] = overlayState;
  const overlayVisible = useMemo(
    () => not(every(({ visible }) => !visible, Object.values(overlay))),
    [overlay],
  );

  return (
    <OverlayContext.Provider value={overlayState}>
      {children}
      {overlayVisible && (
        <StyledOverlay.Root>
          {Object.entries(overlay)
            .filter(([_, { visible }]) => visible)
            .map(([key, { element }]) => (
              <Fragment key={key}>{element}</Fragment>
            ))}
        </StyledOverlay.Root>
      )}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
