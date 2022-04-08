import { ref, defineComponent } from "vue";
import { baseRouter } from "@/router/modules/base";
import router from "@/router";
import AntIcon from "@cmp/icon";
import { useRoute } from "vue-router";
import { MenuItem } from "@/interface";

const handleClick = (e: any): void => {
  console.log(e);
  const path = e.key;
  router.push({ path: path });
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
    console.log(selectedKeys);
    return () => (
      <a-menu
        theme="dark"
        onClick={handleClick}
        v-model:selectedKeys={selectedKeys.value}
        mode="inline"
      >
        {baseRouter.map((menu) => {
          if (menu.meta.level === 1)
            return (
              <a-sub-menu
                style={{ ...radiusDivStyle, borderRadius: "8px" }}
                key={menu.path}
                title={menu.meta.title}
                icon={AntIcon({
                  icon: menu.meta.icon,
                  style: { marginLeft: "-4px" },
                })}
              >
                {menu.meta.itemGroup?.map((v) =>
                  menuItem(
                    baseRouter.filter(
                      (r) => r.path === v && r.meta.level === 2
                    )[0]
                  )
                )}
              </a-sub-menu>
            );
          if (menu.meta.level !== 2) return menuItem(menu);
        })}
      </a-menu>
    );
  },
});
