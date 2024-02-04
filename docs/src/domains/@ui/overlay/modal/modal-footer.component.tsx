import { ComponentPropsWith, forwardRef } from "react";

type ModalFooterProps = ComponentPropsWith<"div">;

const Modal_Footer = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ css, ...props }, ref) => {
    return (
      <div ref={ref} css={[css]} {...props} />
    );
  },
);

export default Modal_Footer;