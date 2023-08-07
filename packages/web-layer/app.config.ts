export default defineAppConfig({
  site: {
    name: 'Magzyne',
  },
  dataSource: {
    ghAdminUsername: "",
    ghRepoUsername: "",
    ghRepoName: "",
    ghDsIssueNumber: 0,
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    site: {
      name: string,
    },
    dataSource: {
      ghAdminUsername: string,
      ghRepoUsername: string,
      ghRepoName: string,
      ghDsIssueNumber: number,
    },
    appContext?: {
      initialScrapeDate?: Date,
    }
  }
}
