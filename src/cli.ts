#!/usr/bin/env node

import { cac } from "cac";

import { version } from "../package.json";
import * as commands from "./commands";

void (async function main() {
  const cli = cac("tsnew");

  commands.run.registerCommand(cli);
  commands.setup.registerCommand(cli);
  commands.template.registerCommand(cli);

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
