import { ComponentPropsWith } from "react";

export type ModalProps = ComponentPropsWith<"div", {
  onClose: () => void;
  onSubmit: () => void;
}>