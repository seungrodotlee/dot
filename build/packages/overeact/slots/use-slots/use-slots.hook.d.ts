import { ReactNode } from "react";
import { Types, SlotElements } from "../internal/slots.types";
export declare const useSlots: <T extends Types>(children: ReactNode, types: T) => Partial<{ [key in keyof T extends infer T_1 ? T_1 extends keyof T ? T_1 extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : T_1 : never : never]: ReactNode; } & Record<"defaultChildren", ReactNode[]>>;
