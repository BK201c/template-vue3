import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as fs from "fs";
import path from "path";
const dotenv = require("dotenv");

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  let NODE_ENV = process.env.NODE_ENV || "development";
  let envFiles = [];
  const evnFile = "./src/env/";
  //根据不同的环境使用不同的环境变量
  if (command == "serve") {
    envFiles = [
      /** default file */
      `${evnFile}.env`,
    ];
  } else {
    envFiles = [
      /** default file */
      `${evnFile}.env`,
      /** mode file */
      `${evnFile}.env.${NODE_ENV}`,
    ];
  }
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }
  return defineConfig({
    // 本地服务配置
    server: {
      host: process.env.VITE_HOST,
      port: process.env.VITE_PORT,
    },

    envDir: "./src/env",

    // 插件
    plugins: [vue()],

    //别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@config": path.resolve(__dirname, "src/config"),
      },
    },

    // 强制预构建插件包
    optimizeDeps: {
      include: ["axios"],
    },

    // 打包配置
    build: {
      target: "modules",
      outDir: "dist", //指定输出路径
      assetsDir: "assets", // 指定生成静态资源的存放路径
      minify: "terser", // 混淆器，terser构建后文件体积更小
    },
  });
};
