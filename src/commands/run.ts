import path from "node:path";
import { mkdir, writeFile, stat, readdir } from "node:fs/promises";
import type { CAC } from "cac";
import { bundleRequire } from "bundle-require";
import {
  intro,
  outro,
  select,
  isCancel,
  cancel,
  spinner as clackSpinner,
} from "@clack/prompts";

import { configDir, templatesPath } from "../files";
import { action as templateAction } from "./template/action";

const spinner = clackSpinner();
const newTemplateAnswerValue = "__NEW_TEMPLATE__";

export function registerCommand(cli: CAC) {
  cli.command("[name]", "Run template").action(async (name?: string) => {
    console.log(); // newline

    // Automatically run template command if templates don't exist.
    try {
      await stat(templatesPath);
    } catch (error) {
      console.log(`You don't have any templates.`);
      console.log("Let's create your first one!\n");
      intro(`🆕 tsnew`);
      await runTemplateCreatorWorkflow();
      return;
    }

    let selectedTemplate = name;

    intro(`🆕 tsnew`);

    if (!name) {
      const templates = await readdir(templatesPath);

      const response = await select({
        message: "Which template do you want to run?",
        options: [
          { value: newTemplateAnswerValue, label: "Create a new template" },
          ...templates.map((template) => ({
            value: template,
            label: template,
          })),
        ],
      });

      if (isCancel(response)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      if (response === newTemplateAnswerValue) {
        await runTemplateCreatorWorkflow();
        return;
      }

      selectedTemplate = response as string;
    }

    if (!selectedTemplate) return;

    spinner.start(`Running ${selectedTemplate}...`);

    // TODO: Dynamically find all available `*.template.ts` files.
    const templatePath = path.join(
      templatesPath,
      selectedTemplate,
      "default.template.ts"
    );

    const { mod } = await bundleRequire({ filepath: templatePath });

    const compiled = await mod.default({ input: { name: selectedTemplate } });
    const compiledPath = path.join(
      process.cwd(),
      path.normalize(compiled.path)
    );

    await mkdir(path.dirname(compiledPath), { recursive: true });
    await writeFile(compiledPath, compiled.content, "utf-8");

    spinner.stop(`Created ${compiledPath}`);

    outro(`✅ Finished`);
  });
}

async function runTemplateCreatorWorkflow() {
  const createdName = await templateAction();

  outro("✅ Finished");

  console.log(`Update your template in ${configDir}/templates/${createdName}.`);
  console.log(`Then, run your template: npx tsnew ${createdName}`);
}
