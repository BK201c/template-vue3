<template>
  <section class="navbar">
    <div class="navbar-logo">
      <img :src="logo" alt="" />
    </div>
    <div class="navbar-menu">
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item v-for="nav in navList" :key="nav.key">{{
          nav.title
        }}</a-menu-item>
      </a-menu>
    </div>
  </section>
</template>

<script lang="ts" setup>
import logo from "@assets/logo.png";
import { navList } from "@/config/menu";
import { ref } from "vue";
const selectedKeys = ref<string[]>([navList[0]]);
</script>

<style lang="scss" scoped>
@import "@/styles/_var.scss";
.navbar {
  width: 100%;
  display: flex;
  &-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    img {
      height: $navHeight;
      width: $navHeight;
    }
  }
}
</style>
