import { ScrapeExecutor, Scraper } from "@magzyne/skraper/dist/scraper";

const scraperExecuter: ScrapeExecutor = async ($, axios, addNewsItem) => {
  console.log($("title").text());
};

const scraper: Scraper = {
  sourceId: "meta",
  url: "https://engineering.fb.com/",
  execute: scraperExecuter,
};

export default scraper;
