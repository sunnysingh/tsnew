import path from "node:path";
import type { CAC } from "cac";
import { text, isCancel, cancel } from "@clack/prompts";

import * as flow from "../../flow";
import type { TemplateContext } from "../../template-api";
import {
  bundleTemplatePaths,
  findTemplatePaths,
  hasTemplatesDir,
  templatesPath,
  writeTemplateFiles,
} from "../../files";
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

      // TODO: Prompt based on input defined in template.

      flow.spinner.start(`Running ${selectedTemplate} template`);

      const templateContext: TemplateContext<{}> = {
        input: {},
      };

      await writeTemplateFiles(bundledTemplateFiles, {
        cwd: process.cwd(),
        templateContext,
        onCreated(relativeFilePath) {
          flow.log.info(`Created ${relativeFilePath}`);
        },
      });

      flow.spinner.stop(`Finished running ${selectedTemplate} template`);

      flow.end();
    });
}
