import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { text, isCancel, cancel } from "@clack/prompts";

import { hasConfigDir, createConfigDir, configPath } from "../../files";
import * as flow from "../../flow";
import { compileDefaultTemplate } from "./default-template";

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

  const templatePath = path.join(configPath, "templates", name);
  const templateRelativePath = path.relative(process.cwd(), templatePath);
  const templateDefaultFilePath = path.join(
    templatePath,
    "default.template.ts"
  );

  await mkdir(templatePath, { recursive: true });
  await writeFile(templateDefaultFilePath, `${compileDefaultTemplate(name)}\n`);

  flow.spinner.stop(`Created ${templateRelativePath}`);

  return name;
}
