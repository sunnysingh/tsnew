import type { CAC } from "cac";
import { intro, outro } from "@clack/prompts";

import { configDir } from "../../files";
import { action } from "./action";

export function registerCommand(cli: CAC) {
  cli.command("template", "Create a new template").action(async () => {
    console.log(); // newline

    intro("🆕 tsnew");

    const name = await action();

    outro("✅ Finished");

    console.log(`Update your template in ${configDir}/templates/${name}.`);
    console.log(`Then, run your template: npx tsnew ${name}`);
  });
}
