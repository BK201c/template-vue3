<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :style="{ height: '100%', borderRight: 0 }"
    mode="inline"
    @click="handleClick"
  >
    <a-sub-menu
      :key="menu.key"
      v-for="menu in menuList"
      @titleClick="titleClick"
    >
      <template #icon>
        <MailOutlined />
      </template>
      <template #title>{{ menu.title }}</template>
      <a-menu-item :key="menuItem.key" v-for="menuItem in menu.children">{{
        menuItem.title
      }}</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts" setup>
import { MailOutlined } from "@ant-design/icons-vue";
import { reactive, toRefs } from "vue";
import { menuList } from "@/config/menu";

const state = reactive({
  selectedKeys: ["1"],
  openKeys: ["sub1"],
});
const { selectedKeys, openKeys } = toRefs(state);

const handleClick = (e: Event): void => {
  console.log("click", e);
};

const titleClick = (e: Event): void => {
  console.log("titleClick", e);
};
</script>

<style lang="scss" scoped></style>
