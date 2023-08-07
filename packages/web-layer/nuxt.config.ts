// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const currentPath = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  css: [join(currentPath, "main.css")],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});