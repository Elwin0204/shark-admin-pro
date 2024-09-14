import { addAPIProvider, disableCache } from "@iconify/vue";

export function setupIconify() {
  const { VITE_ICONIFY_URL } = import.meta.env;
  if (VITE_ICONIFY_URL) {
    addAPIProvider("", { resources: [VITE_ICONIFY_URL] });
    disableCache("all");
  }
}
