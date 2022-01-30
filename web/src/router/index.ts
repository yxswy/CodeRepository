import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, RouteMeta } from "vue-router";

import Layout from "@/layouts/index.vue";

interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: RouteMeta;
  hidden: boolean;
}

const routes: AppRouteRecordRaw[] = [
  {
    path: "/",
    name: "App",
    redirect: "/homepage",
    component: Layout,
    hidden: false,
    meta: {},
    children: [
      {
        path: "homepage",
        name: "HomePage",
        component: () => import("@/views/index.vue"),
        meta: {
          title: "i123",
        },
      },
      {
        path: "homepage/:id",
        name: "HomePageDetail",
        component: () => import("@/views/index.vue"),
        meta: {
          title: "i123",
        },
      },
    ],
  },
];
const router = createRouter({
  routes: routes as unknown as RouteRecordRaw[],
  history: createWebHashHistory("/"),
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      //解决页面从列表页跳转到详情页返回,初始在原来位置
      return savePosition;
    } else {
      //解决页面跳转后页面高度和前一个页面高度一样
      return Promise.resolve({ left: 0, top: 0 });
    }
  },
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
