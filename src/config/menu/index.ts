import { MenuItem } from "./interface";

//顶部导航
export const navList: Array<MenuItem> = [
  {
    title: "主页",
    key: "home",
  },
  {
    title: "管理",
    key: "setting",
  },
];

//侧边栏导航
export const menuList: Array<MenuItem> = [
  {
    title: "工作台",
    key: "operation",
    children: [
      {
        title: "仪表盘",
        key: "dashboard",
      },
    ],
  },
  {
    title: "设置",
    key: "setting",
    children: [
      {
        title: "个人中心",
        key: "userhome",
      },
    ],
  },
];
