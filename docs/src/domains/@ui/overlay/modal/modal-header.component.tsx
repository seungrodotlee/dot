import { forwardRef, useContext } from "react";

import { refineProps } from "../../../../utils";

import { StyledModal } from "./modal.styles";
import { ModalHeaderProps } from "./modal.types";
import ModalContext from "./modal.context";

const Modal_Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, ...props }, ref) => {
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
      throw new Error("ModalContext에 값을 전달해주세요");
    }

    const { title } = modalContext;

    return (
      <StyledModal.Header ref={ref} {...refineProps(props)}>
        <h1>{title}</h1>
        <div>{children}</div>
      </StyledModal.Header>
    );
  },
);

export default Modal_Header;
