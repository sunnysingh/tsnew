import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { bundleRequire } from "bundle-require";

import { templatesPath } from "../files";

export const run = async (name: string) => {
  // TODO: Make this dynamic.
  const templatePath = path.join(templatesPath, name, "default.template.ts");

  const { mod } = await bundleRequire({ filepath: templatePath });

  const compiled = await mod.default({ input: { name } });
  const compiledPath = path.join(process.cwd(), path.normalize(compiled.path));

  await mkdir(path.dirname(compiledPath), { recursive: true });
  await writeFile(compiledPath, compiled.content, "utf-8");

  console.log(`\nCreated ${compiledPath}`);
};
