import type { App } from "vue";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouterHistory,
} from "vue-router";
import { createRouterGuard } from "./guard";
import { createConstantRoutes } from "./routes";

const { VITE_ROUTER_MODE = "history", VITE_BASE_URL } = import.meta
  .env as Env.CustomImportMetaEnv;

const routerModeMap: Record<Env.RouterMode, (base?: string) => RouterHistory> =
  {
    hash: createWebHashHistory,
    history: createWebHistory,
    memory: createMemoryHistory,
  };

export const router = createRouter({
  history: routerModeMap[VITE_ROUTER_MODE](VITE_BASE_URL),
  routes: createConstantRoutes(),
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard();
  await router.isReady();
}
