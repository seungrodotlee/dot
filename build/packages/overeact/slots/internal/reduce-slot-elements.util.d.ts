import { ReactNode } from "react";
import { ElementType } from "./slots.types";
export declare const reduceSlotElements: <T>(typeAndKeyMap: Map<ElementType, string>) => (children: ReactNode) => Partial<{ [key in keyof T extends infer T_1 ? T_1 extends keyof T ? T_1 extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : T_1 : never : never]: ReactNode; } & Record<"defaultChildren", ReactNode[]>>;
