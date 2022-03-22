//菜单信息
export interface MenuItem {
  path: string;
  meta: {
    title: string;
    icon: string;
  };
  component?: Function;
  name?: string;
  redirect?: string;
  children?: MenuItem[];
}
