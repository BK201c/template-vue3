<template>
  <a-layout class="layout">
    <a-layout-sider
      class="layout-sidebar"
      :collapsed="isCollapsed"
      :trigger="null"
      collapsible
    >
      <Logo class="layout-sidebar-bottom" @change="change"></Logo>
      <Sidebar></Sidebar>
    </a-layout-sider>
    <a-layout class="layout-main">
      <a-layout-content class="layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Sidebar from "./components/sidebar/index.vue";
import Logo from "./components/logo/index.vue";
import { ref } from "@vue/reactivity";

const isCollapsed = ref<boolean>(true);
const change = (value: boolean) => {
  isCollapsed.value = value;
};
</script>

<style lang="scss" scoped>
@import "@/styles/_var.scss";
.layout {
  height: $layoutHeight;
  width: $layoutWidth;
  &-main {
    overflow: hidden;
  }
  &-content {
    padding: 20px;
  }
  &-sidebar {
    position: relative;
    &-top {
      font-size: 20px;
    }
    &-bottom {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      font-size: 20px;
    }
  }
}
</style>
