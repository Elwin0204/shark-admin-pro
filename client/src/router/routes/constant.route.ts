const constantRoutes: App.Global.RouteRecordConfig[] = [
  {
    name: "root",
    component: "layout.base",
    path: "/",
    redirect: "/home",
    meta: {
      title: "",
    },
    children: [
      {
        name: "home",
        path: "/home",
        component: "home/index",
        meta: {
          title: "home",
          i18nKey: "route.home",
          icon: "mdi:monitor-dashboard",
          sort: 1,
        },
      },
    ],
  },
  {
    name: "401",
    path: "/error/401",
    component: "error/401",
    meta: {
      title: "401",
    },
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: "error/404",
    meta: {
      title: "404",
    },
  },
];

export default constantRoutes;
