export type ItemOfArray<T> = T extends Array<infer Item> ? Item : T;
