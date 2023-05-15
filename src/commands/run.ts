import path from "node:path";
import { mkdir, writeFile, stat, readdir } from "node:fs/promises";
import type { CAC } from "cac";
import { bundleRequire } from "bundle-require";
import { globby } from "globby";
import { text, select, isCancel, cancel } from "@clack/prompts";

import * as flow from "../flow";
import { templatesPath } from "../files";
import { TemplateContext } from "../template-api";
import * as templateAction from "./template/action";

const newTemplateAnswerValue = "__NEW_TEMPLATE__";

export function registerCommand(cli: CAC) {
  cli
    .command("[templateName]", "Run template")
    .action(async (templateName?: string) => {
      flow.start();

      try {
        await stat(templatesPath);
      } catch (error) {
        flow.log.warn("You don't have any templates.");
        flow.log.info("Let's create your first one!");
        await continueWithTemplateCreatorFlow();
        return;
      }

      const cwd = process.cwd();
      let selectedTemplate = templateName;

      if (!templateName) {
        selectedTemplate = await addSelectTemplateFlow();
        if (!selectedTemplate) return;
      }

      if (selectedTemplate === undefined) {
        flow.log.error("Unable to determine selected template.");
        flow.end();
        process.exit(1);
      }

      const selectedTemplatePath = path.join(templatesPath, selectedTemplate);

      const foundTemplatePaths = await globby("**/*.template.ts", {
        cwd: selectedTemplatePath,
      });

      const bundledTemplateFiles = await Promise.all(
        foundTemplatePaths.map((foundTemplatePath) =>
          bundleRequire({
            filepath: path.join(
              selectedTemplatePath,
              path.normalize(foundTemplatePath)
            ),
          })
        )
      );

      const templateContextInputName = await text({
        message: `What is the name of this ${selectedTemplate}?`,
      });

      if (isCancel(templateContextInputName)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      flow.spinner.start(`Running ${selectedTemplate} template`);

      for (const { mod } of bundledTemplateFiles) {
        const templateContext: TemplateContext = {
          input: { name: templateContextInputName },
        };
        const compiled = await mod.default(templateContext);
        const compiledPath = path.join(cwd, path.normalize(compiled.path));

        await mkdir(path.dirname(compiledPath), { recursive: true });
        await writeFile(compiledPath, compiled.content, "utf-8");

        flow.log.info(`Created ${path.relative(cwd, compiledPath)}`);
      }

      flow.spinner.stop(`Finished running ${selectedTemplate} template`);

      flow.end();
    });
}

async function continueWithTemplateCreatorFlow() {
  const createdName = await templateAction.action();

  flow.end();

  templateAction.afterAction(createdName);
}

async function addSelectTemplateFlow(): Promise<string | undefined> {
  const templates = await readdir(templatesPath);
  const templateOptions = templates.map((template) => ({
    label: template,
    value: template,
  }));
  const templateCreatorOption = {
    label: "add a new template",
    value: newTemplateAnswerValue,
  };

  const response = await select({
    message: "Which template do you want to run?",
    options: [...templateOptions, templateCreatorOption],
  });

  if (isCancel(response)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  if (response === newTemplateAnswerValue) {
    await continueWithTemplateCreatorFlow();
    return;
  }

  return response as string;
}
