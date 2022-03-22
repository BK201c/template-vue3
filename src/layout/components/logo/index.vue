<template>
  <div class="logo">
    <div
      class="title animate__animated"
      :class="isCollapsed ? 'animate__fadeOutLeft' : 'animate__fadeInLeft'"
    >
      <img :src="logo" alt="logo" />
      <i>&nbsp;{{ title }}</i>
    </div>
    <AntIcon
      :icon="isCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
      :class="{ collapsed: isCollapsed }"
      @click="change"
    />
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/img/logo.png";
import AntIcon from "@/components/icon";
import { ref } from "@vue/reactivity";
const title = import.meta.env.VITE_APP_NAME;
const isCollapsed = ref<Boolean>(true);

const emit = defineEmits(["change"]);
const change = (): void => {
  isCollapsed.value = !isCollapsed.value;
  emit("change", isCollapsed.value);
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  color: #fff;
  width: 100%;
  .title {
    display: flex;
    align-items: center;
  }
  img {
    width: 30px;
  }
  i {
    font-size: 14px;
  }
  .collapsed {
    position: relative;
    left: -50%;
    transform: translateX(-50%);
  }
}
</style>
