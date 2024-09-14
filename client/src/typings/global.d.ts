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

  export interface Window {
    // 加载进度条实例
    NProgress?: import("nprogress").NProgress;
    // Ant-design-vue消息实例
    $message?: import("ant-design-vue/es/message/interface").MessageInstance;
    // Ant-design-vue模态框实例
    $modal?: Omit<
      import("ant-design-vue/es/modal/confirm").ModalStaticFunctions,
      "warn"
    >;
    // Ant-design-vue通知实例
    $notification?: import("ant-design-vue/es/notification/interface").NotificationInstance;
  }
}

export {};
