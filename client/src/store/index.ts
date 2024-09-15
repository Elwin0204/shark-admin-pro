import type { App } from "vue";
import { createPinia } from "pinia";
import { createResetPlugin } from "./utils/reset.util";

export function setupStore(app: App) {
  const store = createPinia();
  store.use(createResetPlugin);
  app.use(store);
}
