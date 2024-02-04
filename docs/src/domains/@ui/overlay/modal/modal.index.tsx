import "twin.macro";
import { forwardRef } from "react";

import useChild from "../../../@shared/use-child/use-child.hook";

import { ModalProps } from "./modal.types";
import ModalContext from "./modal.context";
import Modal_Header from "./modal-header.component";
import Modal_Body from "./modal-body.component";
import Modal_Footer from "./modal-footer.component";

const _Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ onClose, onSubmit, children, css, ...props }, ref) => {
    const { getChild } = useChild(children);

    const head = getChild(Modal.Header);
    const body = getChild(Modal.Body);
    const footer = getChild(Modal.Footer);

    return (
      <ModalContext.Provider
        value={{
          onClose,
          onSubmit,
        }}
      >
        <div ref={ref} {...props}>
          {head}
          {body}
          {footer}
        </div>
      </ModalContext.Provider>
    );
  },
);

const Modal = Object.assign(_Modal, {
  Header: Modal_Header,
  Body: Modal_Body,
  Footer: Modal_Footer,
});

export default Modal;
