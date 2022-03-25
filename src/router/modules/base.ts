import { MenuItem } from "@/interface";

//侧边栏导航
export const baseRouter: Array<MenuItem> = [
  {
    meta: {
      title: "首页",
      icon: "HomeOutlined",
    },
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    meta: {
      title: "关于",
      icon: "SettingOutlined",
    },
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
  },
];
