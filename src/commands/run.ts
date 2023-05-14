import path from "node:path";
import { mkdir, writeFile, stat, readdir } from "node:fs/promises";
import { bundleRequire } from "bundle-require";
import type { CAC } from "cac";

import {
  templatesPath,
  configDir,
  hasConfigDir,
  createConfigDir,
} from "../files";

async function printAvailableTemplates() {
  const noSetup = !(await hasConfigDir());

  if (noSetup) {
    console.log("Project is not set up. Setting up...");
    await createConfigDir();
    console.log(`Created ${configDir}!\n`);
  }

  await stat(templatesPath).catch(() => {
    console.log("There are no available templates.");
    console.log("Please run: npx tsnew template <name>");
    process.exit(1);
  });

  const templates = await readdir(templatesPath);

  console.log("\nAvailable templates:\n");
  console.log(`  • ${templates.join("\n  ")}`);
  console.log("\nRun: npx tsnew <template>");
}

export function registerCommand(cli: CAC) {
  cli.command("[name]", "Run template").action(async (name?: string) => {
    if (!name) {
      await printAvailableTemplates();
      return;
    }

    // TODO: Make this dynamic.
    const templatePath = path.join(templatesPath, name, "default.template.ts");

    const { mod } = await bundleRequire({ filepath: templatePath });

    const compiled = await mod.default({ input: { name } });
    const compiledPath = path.join(
      process.cwd(),
      path.normalize(compiled.path)
    );

    await mkdir(path.dirname(compiledPath), { recursive: true });
    await writeFile(compiledPath, compiled.content, "utf-8");

    console.log(`\nCreated ${compiledPath}`);
  });
}
