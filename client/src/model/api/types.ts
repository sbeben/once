export type FieldChange<T> = {
  [K in keyof T]?: T[K];
};
