import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { text, isCancel, cancel } from "@clack/prompts";

import {
  configDir,
  hasConfigDir,
  createConfigDir,
  configPath,
  templatesDir,
} from "../../files";
import * as flow from "../../flow";
import { formatCommand, formatFileTree } from "../../format";
import { compileStarterTemplate } from "../../default-templates";

const DEFAULT_TEMPLATE_FILENAME = "default.template.ts";

export async function action(): Promise<string> {
  const name = await text({
    message: "What is the name of this template?",
    validate(value) {
      if (value.length === 0) return "Name is required.";
    },
  });

  if (isCancel(name)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  flow.spinner.start("Creating template...");

  if (!(await hasConfigDir())) await createConfigDir();

  const templatePath = path.join(configPath, templatesDir, name);
  const templateRelativePath = path.relative(process.cwd(), templatePath);
  const templateDefaultFilePath = path.join(
    templatePath,
    DEFAULT_TEMPLATE_FILENAME
  );

  await mkdir(templatePath, { recursive: true });
  await writeFile(templateDefaultFilePath, `${compileStarterTemplate(name)}\n`);

  flow.spinner.stop(`Created ${templateRelativePath}`);

  return name;
}

export function printPostActionInstructions(name: string) {
  console.log("You can update your new templates here:\n");
  console.log(formatFileTree([configDir, templatesDir, name]));

  console.log("After that, you can run your template:");
  console.log(formatCommand(`npx tsnew ${name}`));
}
