// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const currentPath = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  // @ts-ignore
  tailwindcss: {
    configPath: join(currentPath, 'tailwind.config.js'),
    cssPath: join(currentPath, 'main.css'),
  }
});