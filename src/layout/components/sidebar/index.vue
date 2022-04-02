<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
    @click="handleClick"
  >
    <a-menu-item
      :key="menu.path"
      style="width: 90%; margin: auto; border-radius: 8px"
      v-for="menu of baseRouter"
      @titleClick="titleClick"
    >
      <template #icon>
        <AntIcon style="margin-left: -4px" :icon="menu.meta.icon" />
      </template>
      {{ menu.meta.title }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { baseRouter } from "@/router/modules/base";
import router from "@/router";
import AntIcon from "@cmp/icon";
import { useRoute } from "vue-router";
const route = useRoute();
const selectedKeys = ref([route.path]);

const handleClick = (e: any): void => {
  const path = e.keyPath.join("/");
  router.push({ path: path });
  console.log(e);
};

const titleClick = (e: Event): void => {
  console.log("titleClick", e);
};
</script>

<style lang="scss" scoped></style>
