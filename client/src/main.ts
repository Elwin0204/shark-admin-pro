import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupStore } from "./store";
import { setupRouter } from "./router";

import "uno.css";

async function setupApp() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  app.mount("#app");
}

setupApp();
