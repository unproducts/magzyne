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

export type NewsItemRaw = NewsItem & {
  date: string;
};

export type NewsItemScraped = Omit<NewsItemRaw, "source">;

export type ScrapeExecutor = (
  $: CheerioAPI,
  axios: Axios,
  addNewsItem: (n: NewsItemScraped) => void
) => Promise<void>;

export type Scraper = {
  sourceId: string;
  url: string;
  execute: ScrapeExecutor;
};

const scrapers: Scraper[] = [];

export function registerScraper(scraper: Scraper) {
  scrapers.push(scraper);
}

export async function scrapeNow(): Promise<NewsItemRaw[]> {
  const newsItems: NewsItemRaw[] = [];
  const scraperPromises: Promise<void>[] = [];

  for (let index = 0; index < scrapers.length; index++) {
    const scraper = scrapers[index];

    const axios = new Axios({
      baseURL: scraper.url,
    });

    const response = await axios.get("");
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

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
