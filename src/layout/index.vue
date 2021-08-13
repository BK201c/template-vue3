<template>
  <a-layout class="layout">
    <a-layout-header>
      <Navbar></Navbar>
    </a-layout-header>
    <a-layout class="layout-main">
      <a-layout-sider>
        <Sidebar></Sidebar>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="layout-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Sidebar from "./components/sidebar/index.vue";
import Navbar from "./components/navbar/index.vue";
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
}
</style>
