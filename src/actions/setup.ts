import { mkdir, writeFile } from "node:fs/promises";

import { configPath, readmePath } from "../paths";

const README = `
# 🆕 tsnew

Code Generator for TypeScript

## Usage

For a list of available templates, run:

\`\`\`sh
npx tsnew
\`\`\`
`.trim();

export const setupAction = async () => {
  await mkdir(configPath);

  console.log;

  await writeFile(readmePath, `${README}\n`);
};
