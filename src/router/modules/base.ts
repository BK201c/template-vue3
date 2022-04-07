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
    },
    redirect: "/setting/detail",
    path: "/setting",
    children: [
      {
        meta: {
          title: "系统设置",
        },
        path: "detail",
        name: "settingDetail",
        component: () => import("@/views/setting/index.vue"),
      },
    ],
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
