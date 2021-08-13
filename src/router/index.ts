import { createRouter, createWebHashHistory } from "vue-router";
import dashboard from "@/views/crm/dashboard/index.vue";

const constantRouterMap = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
});

export default router;
