export type UseGeulOptions = {
    speed: number;
    initial?: string;
    decomposeOnBackspace?: boolean;
};
export declare const useGeul: (value: string, { speed, initial, decomposeOnBackspace }: UseGeulOptions) => {
    geul: string;
    isRunning: boolean;
    reset: () => void;
    run: (onTypeEnd?: () => void) => void;
};
