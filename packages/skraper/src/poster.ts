import { Axios } from "axios";
import { encodeNewsItems } from "./encoder";
import { NewsItem } from "./scraper";

export type GithubDataSource = {
  ghAdminUsername?: string;
  ghRepoUsername: string;
  ghRepoName: string;
  ghDsIssueNumber: number;
  ghPersonalAccessToken: string;
};

export const postNewsItems = async (
  newsItemsRaw: NewsItem[],
  githubDataSource: GithubDataSource,
  isFirstScrape: boolean
) => {
  let {
    ghAdminUsername,
    ghRepoUsername,
    ghRepoName,
    ghDsIssueNumber,
    ghPersonalAccessToken,
  } = githubDataSource;

  let newsItems = newsItemsRaw.map((n) => ({
    ...n,
    date: new Date(n.date),
  }));

  if (!ghAdminUsername) {
    ghAdminUsername = ghRepoUsername;
  }

  if (!isFirstScrape) {
    const scrapeAsOf = new Date();
    // scrape only today's content
    newsItems = newsItems.filter((n) => n.date >= scrapeAsOf);
  }

  if (newsItems.length === 0) {
    console.log("No news items to post.");
    return;
  }

  const encodedNewsItems = encodeNewsItems(newsItems);

  const githubIssuesApiURL = `https://api.github.com/repos/${ghRepoUsername}/${ghRepoName}/issues/${ghDsIssueNumber}`;
  const axiosInstance = new Axios({
    baseURL: githubIssuesApiURL,
    headers: {
      Authorization: `Bearer ${ghPersonalAccessToken}`,
    },
  });

  const response = await axiosInstance
    .post("/comments", {
      body: encodedNewsItems,
    })
    .catch((err) => {
      console.error(err);
    }) as any;

  if (response.status !== 201) {
    console.error(response.data);
    throw new Error("Error posting news items to GitHub");
  }
};
