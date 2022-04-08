import { MenuItem } from "@/interface";

//侧边栏导航
export const baseRouter: Array<MenuItem> = [
  {
    meta: {
      title: "首页",
      icon: "home-outlined",
    },
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    meta: {
      title: "设置",
      icon: "SettingOutlined",
      level: 1,
      itemGroup: ["/setSys"],
    },
    path: "/setting",
    name: "setting",
  },
  {
    meta: {
      title: "系统设置",
      level: 2,
    },
    path: "/setSys",
    name: "setSys",
    component: () => import("@/views/setting/index.vue"),
  },
  {
    meta: {
      title: "关于",
      icon: "QuestionCircleOutlined",
    },
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
  },
];
