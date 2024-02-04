import { ComponentPropsWith } from "react";

export type ModalProps = ComponentPropsWith<"div", {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}>

export type ModalHeaderProps = ComponentPropsWith<"div">;

export type ModalBodyProps = ComponentPropsWith<"div">;

export type ModalFooterProps = ComponentPropsWith<"div">;