import { createContext } from "react";

import { ModalProps } from "./modal.types";

const ModalContext = createContext<Pick<ModalProps, "title" | "onClose" | "onSubmit"> | null>(null);

export default ModalContext;