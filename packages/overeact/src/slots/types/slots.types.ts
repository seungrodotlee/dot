import { ReactNode } from "react";

export type SlotsProp<S extends string> = {
  slots: Record<S, ReactNode> & Record<"defaultChildren", ReactNode[]>
};