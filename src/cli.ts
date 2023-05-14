#!/usr/bin/env node

import { cac } from "cac";

import { version } from "../package.json";
import * as actions from "./actions";

void (async function main() {
  const cli = cac("tsnew");

  // TODO: Separate out commands (not just actions) into separate files.
  // Example: defineRootCommand(cli);
  cli.command("", "View available templates").action(actions.root);

  cli.command("<name>", "Run template").action(actions.run);

  cli.command("setup", "Set up tsnew in a project").action(actions.setup);

  cli
    .command("template <name>", "Create a new template")
    .action(actions.template);

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
