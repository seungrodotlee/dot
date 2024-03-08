import { DependencyList } from "react";
import { UseGeulOptions } from "./use-geul";
export type UseGeulPipeOptions = UseGeulOptions;
export declare const useGeulPipe: (values: string[], { speed, initial, decomposeOnBackspace }: UseGeulPipeOptions, deps?: DependencyList) => {
    geul: string;
    isRunning: boolean;
    isEnded: boolean;
    next: () => void;
    reset: () => void;
};
