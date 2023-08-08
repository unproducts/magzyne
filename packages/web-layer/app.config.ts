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

export type GithubDataSource = {
  ghAdminUsername?: string,
  ghRepoUsername: string,
  ghRepoName: string,
  ghDsIssueNumber: number,
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    site: {
      name: string,
    },
    dataSource: GithubDataSource,
    appContext?: {
      initialScrapeDate?: Date,
    }
  }
}
