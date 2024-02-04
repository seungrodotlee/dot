import { ComponentPropsWith, forwardRef } from "react";


type ModalBodyProps = ComponentPropsWith<"div">;

const Modal_Body = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ css, ...props }, ref) => {
    return (
      <div ref={ref} css={[css]} {...props} />
    );
  },
);

export default Modal_Body;