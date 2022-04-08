//菜单信息
enum MenuType {
  Normal = 0,
  SubMenu = 1,
  SubMenuItem = 2,
}
type MenuLevel = MenuType.SubMenu | MenuType.SubMenuItem;
export interface MenuItem {
  path: string;
  meta: {
    title: string;
    icon?: string;
    level?: MenuLevel;
    itemGroup?: string[];
  };
  component?: Function;
  name?: string;
  redirect?: string;
  children?: MenuItem[] | [];
}
