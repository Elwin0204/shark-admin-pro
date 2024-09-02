import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import {
  name,
  version,
  engines,
  dependencies,
  devDependencies,
} from "./package.json";

/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now(),
};

const pathSrc = resolve(__dirname, "src");
//  https://cn.vitejs.dev/config
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      // 允许IP访问
      host: "0.0.0.0",
      // 应用端口 (默认:6725)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
    },
    plugins: [vue()],
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});
