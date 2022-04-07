import { h } from "vue";
import * as $Icon from "@ant-design/icons-vue";
import { upperFirst, camelCase } from "lodash";

type IconName = string | undefined | "";
export const AntIcon = (props: { icon: IconName; style?: object }) => {
  const icon = upperFirst(camelCase(props.icon));
  const iconMapper: { [key: string]: any } = $Icon;
  return !icon ? "" : h(iconMapper[icon], { style: props.style });
};

export default AntIcon;
