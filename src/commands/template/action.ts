import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import {
  intro,
  outro,
  text,
  isCancel,
  cancel,
  spinner as clackSpinner,
} from "@clack/prompts";

import { hasConfigDir, createConfigDir, configPath } from "../../files";

const spinner = clackSpinner();

export async function action(): Promise<string> {
  const response = await text({
    message: "What is the name of this template?",
    validate(value) {
      if (value.length === 0) return "Name is required.";
    },
  });

  if (isCancel(response)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const name = response;

  spinner.start("Creating template...");

  if (!(await hasConfigDir())) await createConfigDir();

  const templatePath = path.join(configPath, "templates", name);
  const templateRelativePath = path.relative(process.cwd(), templatePath);
  const templateDefaultFilePath = path.join(
    templatePath,
    "default.template.ts"
  );

  await mkdir(templatePath, { recursive: true });
  await writeFile(templateDefaultFilePath, `${compileContent(name)}\n`);

  spinner.stop(`Created ${templateRelativePath}`);

  return name;
}

const compileContent = (name: string) =>
  `
import { defineTemplate } from "tsnew";

export default defineTemplate((context) => ({
  path: \`${name}/\${context.input.name}.ts\`,
  content: \`// This is a starter file for the \${context.input.name} ${name}!\`,
}));
`.trim();
