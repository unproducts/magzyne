import { CheerioAPI } from "cheerio";
import { Axios } from "axios";
import * as cheerio from "cheerio";

export type NewsItem = {
  title: string;
  description?: string;
  url: string;
  image?: string;
  source: string;
  date: Date;
};
export type NewsItemScraped = Omit<NewsItem, "source">;

export type ScrapeExecutor = (
  $: CheerioAPI,
  axios: Axios,
  addNewsItem: (n: NewsItemScraped) => void
) => Promise<void>;

export type Scraper = {
  sourceId: string;
  url: string;
  execute: ScrapeExecutor;
  isXML?: boolean;
};

const scrapers: Scraper[] = [];

export function registerScraper(scraper: Scraper) {
  scrapers.push(scraper);
}

export async function scrapeNow(): Promise<NewsItem[]> {
  const newsItems: NewsItem[] = [];
  const scraperPromises: Promise<void>[] = [];

  for (let index = 0; index < scrapers.length; index++) {
    const scraper = scrapers[index];

    const axios = new Axios({
      baseURL: scraper.url,
    });

    const response = await axios.get("");
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent, {
      xmlMode: scraper.isXML,
    });

    const registerNewItemFn = (n: NewsItemScraped) => {
      newsItems.push({
        ...n,
        source: scraper.sourceId,
      });
    };

    const scraperPromise = scraper.execute($, axios, registerNewItemFn);

    scraperPromises.push(scraperPromise);
  }

  await Promise.all(scraperPromises);

  return newsItems;
}
