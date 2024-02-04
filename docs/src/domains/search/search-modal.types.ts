import { ComponentPropsWith } from "react";

export type SearchModalProps = ComponentPropsWith<"div", {
  onClose: () => void;
}>