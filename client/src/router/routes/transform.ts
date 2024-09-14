import { RouteRecordRaw } from "vue-router";
import { LayoutComponent } from "@/enums/LayoutComponent.enum";
const modules = import.meta.glob("../../views/**/**.vue");
console.log("modules", modules);
const LayoutBase = () => import("@/layouts/layout/base.vue");
const LayoutBlank = () => import("@/layouts/layout/blank.vue");

export function transformRawRoutesToVueRoutes(routes: RouteRecordRaw[]) {
  console.log("routes", routes);
  const vueRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const vueRoute = { ...route };
    if (!route.name) {
      route.name = route.path;
    }
    if (route.component?.toString() === LayoutComponent.BASE) {
      console.log("layout", route);
      vueRoute.component = LayoutBase;
    } else if (route.component?.toString() === LayoutComponent.BLANK) {
      vueRoute.component = LayoutBlank;
    } else {
      const component = modules[`../../views/${vueRoute.component}.vue`];
      if (component) {
        vueRoute.component = component;
      } else {
        vueRoute.component = modules[`../../views/error/404.vue`];
      }
    }

    if (vueRoute.children) {
      vueRoute.children = transformRawRoutesToVueRoutes(vueRoute.children);
    }

    vueRoutes.push(vueRoute);
  });
  console.log("vueRoutes", vueRoutes);
  return vueRoutes;
}
