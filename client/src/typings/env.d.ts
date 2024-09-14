// import.meta.env类型声明

declare namespace Env {
  type RouterMode = "hash" | "history" | "memory";

  interface CustomImportMetaEnv extends ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_ROUTER_MODE?: RouterMode;
    readonly VITE_STORAGE_PREFIX?: string;
  }
}
// todo: 未生效?
interface ImportMeta {
  readonly env: Env.CustomImportMetaEnv;
}

/**
 * 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示
 */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    engines: {
      node: string;
    };
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  buildTimestamp: string;
};
