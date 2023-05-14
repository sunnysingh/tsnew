import { stat } from "node:fs/promises";

import { configPath, templatesPath } from "../paths";

export const rootAction = async () => {
  await stat(configPath).catch(() => {
    console.log("You have not set up tsnew yet.");
    console.log("Please run: npx tsnew setup");
    process.exit(1);
  });

  await stat(templatesPath).catch(() => {
    console.log("There are no available templates.");
    console.log("Please run: npx tsnew template");
    process.exit(1);
  });
};
