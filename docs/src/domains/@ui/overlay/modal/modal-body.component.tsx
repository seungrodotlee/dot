import { forwardRef } from "react";

import { refineProps } from "../../../../utils";

import { ModalBodyProps } from "./modal.types";

const Modal_Body = forwardRef<HTMLDivElement, ModalBodyProps>((props, ref) => {
  return <div ref={ref} {...refineProps(props)} />;
});

export default Modal_Body;
