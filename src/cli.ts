#!/usr/bin/env node

import { cac } from "cac";

import { version } from "../package.json";
import { rootAction } from "./actions/root";
import { setupAction } from "./actions/setup";
import { templateAction } from "./actions/template";

void (async function main() {
  const cli = cac("tsnew");

  cli.command("", "View available templates").action(rootAction);

  cli.command("setup", "Set up tsnew in a project").action(async () => {
    await setupAction().catch((error) => {
      console.log(`Unable to set up project: ${error}`);
    });
  });

  cli
    .command("template <name>", "Create a new template")
    .action(async (name) => {
      await templateAction(name).catch((error) => {
        console.log(`Unable to create template: ${error}`);
      });
    });

  cli.help();

  cli.version(version);

  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
})();
