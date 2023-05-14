import { stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { configPath } from "../paths";

const template = (name: string) =>
  `
import { defineInput, defineOutput } from "tsnew";

export const input = defineInput({
  name: {
    description: "Name of ${name}",
  },
});

const template = \`
  // These contents will be placed into the file.
  
  // Use input variables like this:
  // Name of ${name}: \${input.name}
\`;

export const output = defineOutput({
  filePath: \`${name}/\${input.name}.ts\`,
  template,
});
`.trim();

export const templateAction = async (name: string) => {
  // TODO: Abstract this into a function and autocreate config dir.
  await stat(configPath).catch(() => {
    console.log("You have not set up tsnew yet.");
    console.log("Please run: npx tsnew setup");
    process.exit(1);
  });

  const templatePath = path.join(configPath, "templates", name);

  await mkdir(templatePath, { recursive: true });
  await writeFile(
    path.join(templatePath, "default.template.ts"),
    `${template(name)}\n`
  );
};
