import { forwardRef } from "react";

import { refineProps } from "../../../../utils";

import { ModalFooterProps } from "./modal.types";

const Modal_Footer = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    return <div ref={ref} {...refineProps(props)} />;
  },
);

export default Modal_Footer;
