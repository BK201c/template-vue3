import { ref, defineComponent } from "vue";
import { baseRouter } from "@/router/modules/base";
import router from "@/router";
import AntIcon from "@cmp/icon";
import { useRoute } from "vue-router";
import { isEmpty } from "lodash";
import { MenuItem } from "@/interface";

const handleClick = (e: any): void => {
  const path = e.keyPath.join("/");
  router.push({ path: path });
  console.log(e);
};

const radiusDivStyle = {
  width: "90%",
  margin: "auto",
  borderRadius: "8px",
};

const menuItem = (menu: MenuItem) => (
  <a-menu-item
    key={menu.path}
    title={menu.meta.title}
    style={{ ...radiusDivStyle }}
    icon={AntIcon({ icon: menu.meta.icon, style: { marginLeft: "-4px" } })}
  >
    {menu.meta.title}
  </a-menu-item>
);

export default defineComponent({
  setup() {
    const route = useRoute();
    const selectedKeys = ref([route.path]);
    return () => (
      <a-menu
        theme="dark"
        onClick={handleClick}
        v-model:selectedKeys={selectedKeys.value}
        mode="inline"
      >
        {baseRouter.map((menu) => {
          if (menu.hasOwnProperty("children") && !isEmpty(menu.children)) {
            return (
              <a-sub-menu
                style={{ ...radiusDivStyle }}
                key={menu.path}
                title={menu.meta.title}
                icon={AntIcon({
                  icon: menu.meta.icon,
                  style: { marginLeft: "-4px" },
                })}
              >
                {menu.children?.map((item) => menuItem(item))}
              </a-sub-menu>
            );
          } else {
            return menuItem(menu);
          }
        })}
      </a-menu>
    );
  },
});
