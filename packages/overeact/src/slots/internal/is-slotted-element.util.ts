import { ReactElement, ReactNode, isValidElement } from "react";

import { ElementType } from "./slots.types";

export const isSlottedElement = (typeAndKeyMap: Map<ElementType, string>) => (child: ReactNode): child is ReactElement => isValidElement(child) && typeAndKeyMap.has(child.type);
