import path from "node:path";
import { stat, mkdir, writeFile } from "node:fs/promises";

export const configDir = ".tsnew";

export const configPath = path.join(process.cwd(), configDir);

export const readmePath = path.join(configPath, "README.md");

export async function hasConfigDir(): Promise<boolean> {
  try {
    return (await stat(configPath)).isDirectory();
  } catch (error) {
    return false;
  }
}

const readme = `
# 🆕 tsnew

Code Generator for TypeScript

## Usage

For a list of available templates, run:

\`\`\`sh
npx tsnew
\`\`\`
`.trim();

export async function createConfigDir() {
  await mkdir(configPath, { recursive: true });
  await writeFile(readmePath, `${readme}\n`);
}

export const templatesPath = path.join(configPath, "templates");
