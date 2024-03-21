import { ReactElement, ReactNode } from "react";
import { ElementType } from "./slots.types";
export declare const isSlottedElement: (typeAndKeyMap: Map<ElementType, string>) => (child: ReactNode) => child is ReactElement<any, string | import("react").JSXElementConstructor<any>>;
