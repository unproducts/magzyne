import { NewsItem } from "./scraper";

export const sanitizeField = (field?: string) => {
  if (!field) {
    return "";
  }
  field = field.replace(/(\r\n|\n|\r)/gm, "");
  field = field.replace(";;", "");
  field = field.replace(";;;", "");
  return field;
};

export const encodeNewsItem = (item: NewsItem) => {
  const title = sanitizeField(item.title);
  const description = sanitizeField(item.description);
  const image = sanitizeField(item.image);
  const url = sanitizeField(item.url);
  const source = sanitizeField(item.source);
  const date = item.date ? `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}` : undefined;

  return `${title};;${description};;${image};;${url};;${source};;${date}`;
};

export const encodeNewsItems = (items: NewsItem[]) => {
  return items.map(encodeNewsItem).join(";;;");
}
