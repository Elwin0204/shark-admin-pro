import type LocalForage from "localforage";

declare global {
  type StorageType = "local" | "session";
  type ForageDriver = "local" | "indexedDB" | "webSQL";
  type ForageType<T extends object> = Omit<
    LocalForage,
    "getItem" | "setItem" | "removeItem"
  > & {
    getItem<K extends keyof T>(
      key: K,
      callback?: (err: any, value: T[K] | null) => void
    ): Promise<T[K] | null>;
    setItem<K extends keyof T>(
      key: K,
      value: T[K],
      callback?: (err: any, value: T[K]) => void
    ): Promise<T[K]>;
    removeItem(key: keyof T, callback?: (err: any) => void): Promise<void>;
  };
}

export {};
