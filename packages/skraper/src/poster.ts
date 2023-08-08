import { Axios } from "axios";
import { encodeNewsItems } from "./encoder";
import { NewsItem } from "./scraper";

export type GithubDataSource = {
  ghAdminUsername?: string;
  ghRepoUsername: string;
  ghRepoName: string;
  ghDsIssueNumber: number;
  ghPersonalAccessToken: string
};

export const postNewsItems = async (
  newsItems: NewsItem[],
  githubDataSource: GithubDataSource,
  isFirstScrape: boolean,
) => {
  let { ghAdminUsername, ghRepoUsername, ghRepoName, ghDsIssueNumber, ghPersonalAccessToken } =
    githubDataSource;
  if (!ghAdminUsername) {
    ghAdminUsername = ghRepoUsername;
  }

  if (!isFirstScrape) {
    const scrapeAsOf = new Date();
    // scrape only today's content
    newsItems = newsItems.filter((n) => n.date >= scrapeAsOf);
  }

  const encodedNewsItems = encodeNewsItems(newsItems);

  const githubIssuesApiURL = `https://api.github.com/repos/${ghRepoUsername}/${ghRepoName}/issues/${ghDsIssueNumber}`;
  const axiosInstance = new Axios({
    baseURL: githubIssuesApiURL,
    headers: {
      Authorization: `Bearer ${ghPersonalAccessToken}`,
    },
  })
  
  const response = await axiosInstance.post("/comments", {
    body: encodedNewsItems,
  });

  if (response.status !== 201) {
    console.error(response.data);
    throw new Error("Error posting news items to GitHub");
  }
};
