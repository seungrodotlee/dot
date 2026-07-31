export type Tail<T extends unknown[]> = T extends [...infer _, infer Last] ? Last : [];
