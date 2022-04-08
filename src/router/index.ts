import { createRouter, createWebHashHistory } from "vue-router";
import { baseRouter } from "./modules/base";
import { MenuItem } from "@/interface";

const constantRouterMap: Array<MenuItem> = [
  {
    path: "/",
    meta: {
      title: "root",
      icon: "",
    },
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard",
    children: baseRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as any,
});

export default router;
