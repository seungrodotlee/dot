import { ReactNode } from "react";

export type Slots<S extends string> = Record<S, ReactNode> & Record<"defaultChildren", ReactNode[]>;