import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

import { configDir, hasConfigDir, createConfigDir, configPath } from "../files";

const compileContent = (name: string) =>
  `
import { defineTemplate } from "tsnew";

export default defineTemplate(({ input }) => ({
  path: \`${name}/\${input.name}.tsx\`,
  content: \`Hello \${input.name}.\`,
}));
`.trim();

export const template = async (name: string) => {
  const noSetup = !(await hasConfigDir());

  if (noSetup) {
    console.log("Project is not set up. Setting up...");
    await createConfigDir();
    console.log(`Created ${configDir}!\n`);
  }

  const templatePath = path.join(configPath, "templates", name);
  const templateDefaultFilePath = path.join(
    templatePath,
    "default.template.ts"
  );

  await mkdir(templatePath, { recursive: true });
  await writeFile(templateDefaultFilePath, `${compileContent(name)}\n`);

  console.log(
    `\nCreated ${path.relative(process.cwd(), templateDefaultFilePath)}`
  );
};
