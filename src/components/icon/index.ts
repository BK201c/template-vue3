import { h } from "vue";
import * as $Icon from "@ant-design/icons-vue";

export const AntIcon = (props: { icon: string }) => {
  const { icon } = props;
  const iconMapper: { [key: string]: any } = $Icon;
  return h(iconMapper[icon]);
};

export default AntIcon;
