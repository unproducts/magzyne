import { defineCommand, runMain } from "citty";
import { scrapeNow } from "./scraper";
import { postNewsItems } from "./poster";

export const command = defineCommand({
  meta: {
    name: "skrape",
    description:
      "Run skraper files to scrape data from the web, and index into github issue.",
  },
  args: {
    ghRepoUsername: {
      type: "string",
      required: true,
      description: "Owner of the repo to save data into.",
    },
    ghRepoName: {
      type: "string",
      required: true,
      description: "Name of the repo to save data into.",
    },
    ghDsIssueNumber: {
      type: "string",
      required: true,
      description: "Issue number of the repo to save data into.",
    },
    ghAdminUsername: {
      type: "string",
      description: "Admin username of the repo to save data into.",
    },
    ghPersonalAccessToken: {
      type: "string",
      required: true,
      description: "Personal access token to use to authenticate with GitHub.",
    },
    isFirstScrape: {
      type: "boolean",
      default: false,
      description: "Whether this is the first scrape.",
    },
  },
  run: async ({ args }) => {
    const {
      ghRepoUsername,
      ghRepoName,
      ghDsIssueNumber,
      ghAdminUsername,
      ghPersonalAccessToken,
      isFirstScrape,
    } = args;
    const newsItems = await scrapeNow();
    await postNewsItems(
      newsItems,
      {
        ghRepoUsername,
        ghRepoName,
        ghDsIssueNumber: parseInt(ghDsIssueNumber),
        ghAdminUsername,
        ghPersonalAccessToken,
      },
      isFirstScrape
    );
  },
});

export const run = () => {
  runMain(command);
}