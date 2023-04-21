export type ObjectValues<T> = T[keyof T];

export function isObject(obj: unknown): obj is object {
  return typeof obj == "object" && obj != null;
}
