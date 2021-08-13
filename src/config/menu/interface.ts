//菜单信息
export interface MenuItem {
  title: string;
  key: string;
  icon?: string;
  children?: MenuItem[];
}
