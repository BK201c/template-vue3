<template>
  <section>
    <div class="logo">
      <img :src="logo" alt="Template Vue3" />
      <p>{{ title }}</p>
    </div>
    <ul>
      <li v-for="(item, index) of items" :key="index">
        {{ item.des }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import logo from "@/assets/img/logo.png";
import config from "../../../package.json";
const title = import.meta.env.VITE_APP_NAME;
const items = [
  {
    des: `版本：v${config.version}`,
  },
  {
    des: `发布日期：2021-09-27`,
  },
  {
    des: "Copyright 2020-2022",
  },
];
</script>

<style lang="scss" scoped>
section {
  text-align: center;
  padding-top: 50px;
  .logo {
    p {
      font-size: 20px;
      margin-top: 10px;
    }
    margin-bottom: 50px;
    img {
      width: 50px;
    }
  }
  li {
    margin-bottom: 15px;
  }
}
</style>
