import localforage from "localforage";

const prefix = import.meta.env.VITE_STORAGE_PREFIX || "";

export function createStorage<T extends object>(
  storageType: StorageType,
  prefix: string
) {
  const currentStorage =
    storageType === "session" ? window.sessionStorage : window.localStorage;

  const storage = {
    set<K extends keyof T>(key: K, value: T[K]) {
      const json = JSON.stringify(value);
      currentStorage.setItem(`${prefix}${key as string}`, json);
    },
    get<K extends keyof T>(key: K): T[K] | null {
      const json = currentStorage.getItem(`${prefix}${key as string}`);
      if (json) {
        let data: T[K] | null = null;
        try {
          data = JSON.parse(json);
        } catch {}
        if (data) {
          return data as T[K];
        }
      }
      return null;
    },
    remove(key: keyof T) {
      currentStorage.removeItem(`${prefix}${key as string}`);
    },
    clear() {
      currentStorage.clear();
    },
  };

  return storage;
}

export function createForage<T extends object>(driver: ForageDriver) {
  const driverMap: Record<ForageDriver, string> = {
    local: localforage.LOCALSTORAGE,
    indexedDB: localforage.INDEXEDDB,
    webSQL: localforage.WEBSQL,
  };

  localforage.config({
    driver: driverMap[driver],
  });

  return localforage as ForageType<T>;
}

export const skLocal = createStorage<any>("local", prefix);
export const skSession = createStorage<any>("session", prefix);
export const skForage = createForage<any>("local");
