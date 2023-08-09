import { ScrapeExecutor, Scraper } from "@magzyne/skraper/dist/scraper";

const scraperExecuter: ScrapeExecutor = async ($, _, addNewsItem) => {
  const items = $("item");
  items.each((_, item) => {
    const title = $(item).find("title").text().trim()
    const link = $(item).find("link").text().trim()
    const description = $(item).find("description").text().trim()
    const pubDate = $(item).find("pubDate").text().trim()

    const date = new Date(pubDate)

    addNewsItem({
      title,
      url: link,
      description,
      date,
    });
  });

};

const scraper: Scraper = {
  sourceId: "zerodha",
  url: "https://zerodha.tech/index.xml",
  execute: scraperExecuter,
  isXML: true,
};

export default scraper;
