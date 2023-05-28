import path from "node:path";
import type { CAC } from "cac";
import * as prompts from "@clack/prompts";

import * as flow from "../../flow";
import {
  bundleTemplatePaths,
  findTemplatePaths,
  hasTemplatesDir,
  templatesPath,
  writeTemplateFiles,
} from "../../files";
import { Template } from "../../template-api";
import * as templatePrompts from "./template-prompts";

export function registerCommand(cli: CAC) {
  cli
    .command("[templateName]", "Run template")
    .action(async (templateName?: string) => {
      flow.start();

      if (!(await hasTemplatesDir())) {
        flow.log.warn("You don't have any templates.");
        flow.log.info("Let's create your first one!");
        await templatePrompts.promptTemplateCreation();
        return;
      }

      let selectedTemplate = templateName;

      if (!templateName) {
        selectedTemplate = await templatePrompts.promptTemplateSelection();
        if (!selectedTemplate) return;
      }

      if (selectedTemplate === undefined) {
        flow.log.error("Unable to determine selected template.");
        flow.end();
        process.exit(1);
      }

      const selectedTemplatePath = path.join(templatesPath, selectedTemplate);
      const foundTemplatePaths = await findTemplatePaths(selectedTemplatePath);
      const bundledTemplateFiles = await bundleTemplatePaths(
        selectedTemplatePath,
        foundTemplatePaths
      );

      await writeTemplateFiles(bundledTemplateFiles, {
        cwd: process.cwd(),
        async getInput(template: Template) {
          if (!template.input) return {};

          const inputPrompts = Object.entries(template.input).reduce<
            Record<string, () => Promise<unknown | symbol>>
          >((promptsGroup, [inputName, inputValue]) => {
            if (inputValue.type === "text") {
              promptsGroup[inputName] = () =>
                prompts.text({ message: inputValue.message });
            }

            if (inputValue.type === "confirm") {
              promptsGroup[inputName] = () =>
                prompts.confirm({ message: inputValue.message });
            }

            return promptsGroup;
          }, {});

          return prompts.group(inputPrompts, {
            onCancel: () => {
              prompts.cancel("Operation cancelled.");
              process.exit(0);
            },
          });
        },
        onBeforeSave() {
          flow.spinner.start(`Running ${selectedTemplate} template`);
        },
        onCreated(relativeFilePath) {
          flow.log.info(`Created ${relativeFilePath}`);
        },
      });

      flow.spinner.stop(`Finished running ${selectedTemplate} template`);

      flow.end();
    });
}
