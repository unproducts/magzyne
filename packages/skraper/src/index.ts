import * as encoder from "./encoder";
import * as scraper from "./scraper";
import * as poster from "./poster";
import * as cli from "./cli";

import { readdirSync } from "fs";
import { join } from "path";
import { Scraper } from "./scraper";

export type ImportedSkraper = { default: Scraper };

export function runTask(baseDir: string, skrapesDirRelativePath: string = "skrapes") {
  const skrapesDir = join(baseDir, skrapesDirRelativePath);
  const skrapes: Promise<ImportedSkraper>[] = readdirSync(skrapesDir)
    .filter((f) => f.endsWith(".js"))
    .map((file) => {
      return import(join(skrapesDir, file)) as Promise<ImportedSkraper>;
    });

  Promise.all(skrapes).then((skrapes) => {
    skrapes.forEach((skrape) => {
      scraper.registerScraper(skrape.default);
    });
    cli.run();
  });
}

export default { encoder, scraper, poster, cli, runTask };
