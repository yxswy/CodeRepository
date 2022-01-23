import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

import Layout from "@/layouts/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "App",
    redirect: "/homepage",
    component: Layout,
    children: [
      {
        path: "homepage",
        name: "HomePage",
        component: () => import("@/views/index.vue"),
      }
    ],
  },
];
const router = createRouter({
  routes,
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
