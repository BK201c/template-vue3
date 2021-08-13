import { createApp } from "vue";
import Layout from "./layout/index.vue";
import router from "./router";

//custom
import "./styles/reset.css";
import "./styles/common.scss";

//antd-UI
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//createAPP
const app = createApp(Layout);
app
  .use(router)
  .use(Antd)
  .mount("#app");
