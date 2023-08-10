// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { fileURLToPath } from "url";
import { join, dirname } from "path";
import daisyui from "daisyui";

const currentPath = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  // @ts-ignore
  tailwindcss: {
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
      ],
      theme: {
        extend: {},
      },
      daisyui: {
        themes: ["black"], // only one theme
      },
    
      plugins: [daisyui],
    },
    cssPath: join(currentPath, 'main.css'),
  }
});