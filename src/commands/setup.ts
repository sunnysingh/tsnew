import type { CAC } from "cac";

import { configDir, hasConfigDir, createConfigDir } from "../files";

export function registerCommand(cli: CAC) {
  cli.command("setup", "Set up tsnew in a project").action(async () => {
    const exists = await hasConfigDir();

    if (exists) {
      console.log("This project is already set up.");
      return;
    }

    await createConfigDir();

    console.log(`\nCreated ${configDir}`);
  });
}
