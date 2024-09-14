const asyncRoutes: App.Global.RouteRecordConfig[] = [
  {
    name: "multi-menu",
    path: "/multi-menu",
    component: "layout.base",
    meta: {
      title: "multi-menu",
      i18nKey: "route.multi-menu",
      sort: 8,
    },
    children: [
      {
        name: "multi-menu_first",
        path: "/multi-menu/first",
        // component: "layout.blank",
        meta: {
          title: "multi-menu_first",
          i18nKey: "route.multi-menu_first",
          sort: 1,
        },
        children: [
          {
            name: "multi-menu_first_child",
            path: "/multi-menu/first/child",
            component: "multi-menu/multi-menu_first/multi-menu_first_child",
            meta: {
              title: "multi-menu_first_child",
              i18nKey: "route.multi-menu_first_child",
            },
          },
        ],
      },
      {
        name: "multi-menu_second",
        path: "/multi-menu/second",
        // component: "layout.blank",
        meta: {
          title: "multi-menu_second",
          i18nKey: "route.multi-menu_second",
          sort: 2,
        },
        children: [
          {
            name: "multi-menu_second_child",
            path: "/multi-menu/second/child",
            meta: {
              title: "multi-menu_second_child",
              i18nKey: "route.multi-menu_second_child",
            },
            children: [
              {
                name: "multi-menu_second_child_page1",
                path: "/multi-menu/second/child/multi-menu_second_child_page1",
                component:
                  "multi-menu/second/child/multi-menu_second_child_page1",
                meta: {
                  title: "multi-menu_second_child_page1",
                  i18nKey: "route.multi-menu_second_child_page1",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "sys",
    path: "/sys",
    component: "layout.base",
    meta: {
      title: "sys",
      i18nKey: "route.sys",
      icon: "fluent:book-information-24-regular",
      sort: 10,
    },
    children: [
      {
        name: "user",
        path: "/sys/user",
        component: "sys/user/index",
        meta: {
          title: "user",
          i18nKey: "route.user",
          icon: "fluent:book-information-24-regular",
          sort: 10,
        },
      },
      {
        name: "role",
        path: "/sys/role",
        component: "sys/role/index",
        meta: {
          title: "role",
          i18nKey: "route.role",
          icon: "fluent:book-information-24-regular",
          sort: 10,
        },
      },
      {
        name: "menu",
        path: "/sys/menu",
        component: "sys/menu/index",
        meta: {
          title: "menu",
          i18nKey: "route.menu",
          icon: "fluent:book-information-24-regular",
          sort: 10,
        },
      },
    ],
  },
  {
    name: "about",
    path: "/about",
    component: "about/index",
    meta: {
      title: "about",
      i18nKey: "route.about",
      icon: "fluent:book-information-24-regular",
      sort: 10,
    },
  },
];

export default asyncRoutes;
