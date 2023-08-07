export default defineAppConfig({
  site: {
    name: 'Magzyne',
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    site: {
      name: string,
    }
  }
}
