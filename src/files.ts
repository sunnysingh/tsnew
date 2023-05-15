import path from "node:path";
import { stat, mkdir, writeFile } from "node:fs/promises";
import { bundleRequire } from "bundle-require";
import { globby } from "globby";

import { readme } from "./default-templates";
import { TemplateContext } from "./template-api";

export const configDir = ".tsnew";

export const configPath = path.join(process.cwd(), configDir);

export const templatesDir = "templates";

export const templatesPath = path.join(configPath, templatesDir);

export const readmePath = path.join(configPath, "README.md");

export async function hasConfigDir(): Promise<boolean> {
  try {
    return (await stat(configPath)).isDirectory();
  } catch (error) {
    return false;
  }
}

export async function createConfigDir() {
  await mkdir(configPath, { recursive: true });
  await writeFile(readmePath, `${readme}\n`);
}

export async function hasTemplatesDir(): Promise<boolean> {
  try {
    return (await stat(templatesPath)).isDirectory();
  } catch (error) {
    return false;
  }
}

export async function findTemplatePaths(
  baseTemplatePath: string
): Promise<string[]> {
  return globby("**/*.template.ts", {
    cwd: baseTemplatePath,
  });
}

type BundleRequireResult = Awaited<ReturnType<typeof bundleRequire>>;

export async function bundleTemplatePaths(
  baseTemplatePath: string,
  templatePaths: string[]
): Promise<BundleRequireResult[]> {
  return Promise.all(
    templatePaths.map((templatePath) =>
      bundleRequire({
        filepath: path.join(baseTemplatePath, path.normalize(templatePath)),
      })
    )
  );
}

export interface TemplateWriterConfig {
  templateContext: TemplateContext;
  cwd: string;
  onCreated: (relativeFilePath: string) => void;
}

export async function writeTemplateFiles(
  bundledTemplateFiles: BundleRequireResult[],
  config: TemplateWriterConfig
) {
  for (const { mod } of bundledTemplateFiles) {
    const compiled = await (mod as any).default(config.templateContext);
    const compiledPath = path.join(config.cwd, path.normalize(compiled.path));

    await mkdir(path.dirname(compiledPath), { recursive: true });
    await writeFile(compiledPath, compiled.content, "utf-8");

    config.onCreated(path.relative(config.cwd, compiledPath));
  }
}
