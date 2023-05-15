import type { CAC } from "cac";

import * as flow from "../../flow";
import { action } from "./action";
import { printInstructions } from "./instructions";

export function registerCommand(cli: CAC) {
  cli.command("template", "Create a new template").action(async () => {
    flow.start();

    const name = await action();

    flow.end();

    printInstructions(name);
  });
}
