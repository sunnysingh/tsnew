import { stat, readdir } from "node:fs/promises";

import {
  configDir,
  hasConfigDir,
  createConfigDir,
  templatesPath,
} from "../files";

export const root = async () => {
  const noSetup = !(await hasConfigDir());

  if (noSetup) {
    console.log("Project is not set up. Setting up...");
    await createConfigDir();
    console.log(`Created ${configDir}!\n`);
  }

  await stat(templatesPath).catch(() => {
    console.log("There are no available templates.");
    console.log("Please run: npx tsnew template <name>");
    process.exit(1);
  });

  const templates = await readdir(templatesPath);

  console.log("\nAvailable templates:\n");
  console.log(`  • ${templates.join("\n  ")}`);
  console.log("\nRun: npx tsnew <template>");
};
