import magzyne from "@magzyne/skraper";
import zerodha from "./skrapes/zerodha-engg";

async function run() {
  magzyne.scraper.registerScraper(zerodha);

  const results = await magzyne.scraper.scrapeNow();
  const encoded = magzyne.encoder.encodeNewsItems(results);

  console.log(encoded);
}

run();
