import { UseGeulOptions } from "./use-geul";
export type UseDynamicGeulOptions = Omit<UseGeulOptions, "initial">;
export declare const useDynamicGeul: (initial: string, { speed, decomposeOnBackspace }: UseDynamicGeulOptions) => {
    geul: string;
    isRunning: boolean;
    reset: () => void;
    run: (value: string) => void;
};
