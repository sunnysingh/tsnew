import path from 'node:path';
import type { CAC } from 'cac';
import * as prompts from '@clack/prompts';

import * as flow from '../../flow';
import {
  bundleTemplatePaths,
  findTemplatePaths,
  hasTemplatesDir,
  templatesPath,
  writeTemplateFiles,
} from '../../files';
import type { Template, PromptType } from '../../template-api';
import * as templatePrompts from './template-prompts';

export function registerCommand(cli: CAC) {
  cli
    .command('[templateName]', 'Run template')
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
        flow.log.error('Unable to determine selected template.');
        flow.end();
        process.exit(1);
      }

      const selectedTemplatePath = path.join(templatesPath, selectedTemplate);
      const foundTemplatePaths = await findTemplatePaths(selectedTemplatePath);
      const bundledTemplateFiles = await bundleTemplatePaths(
        selectedTemplatePath,
        foundTemplatePaths,
      );

      const inputCache: Record<string, unknown> = {};

      await writeTemplateFiles(bundledTemplateFiles, {
        cwd: process.cwd(),
        onSave(relativeFilePath) {
          flow.log.info(`Created ${relativeFilePath}`);
        },
        async getInput(template: Template) {
          if (!template.input) return {};

          const pendingCacheKeys: (string | undefined)[] = [];
          const cachedInputEntries: [string, unknown][] = [];
          const input = template.input as Record<string, PromptType>;
          const inputPrompts = Object.entries(input).reduce<
            Record<string, () => Promise<unknown | symbol>>
          >((promptsGroup, [inputName, inputValue], index) => {
            const cacheKey = `${inputName}|${inputValue.type}|${inputValue.message}`;

            if (inputCache[cacheKey]) {
              cachedInputEntries.push([inputName, inputCache[cacheKey]]);
              return promptsGroup;
            }

            pendingCacheKeys[index] = cacheKey;

            if (inputValue.type === 'text') {
              promptsGroup[inputName] = () =>
                prompts.text({ message: inputValue.message });
              return promptsGroup;
            }

            if (inputValue.type === 'confirm') {
              promptsGroup[inputName] = () =>
                prompts.confirm({ message: inputValue.message });
              return promptsGroup;
            }

            throw new Error(`Unknown input type: ${inputValue.type}`);
          }, {});

          const inputAnswers = await prompts.group(inputPrompts, {
            onCancel: () => {
              prompts.cancel('Operation cancelled.');
              process.exit(0);
            },
          });

          Object.values(inputAnswers).forEach((answer, index) => {
            const cacheKey = pendingCacheKeys[index];
            if (cacheKey) inputCache[cacheKey] = answer;
          });

          return { ...Object.fromEntries(cachedInputEntries), ...inputAnswers };
        },
      });

      flow.end();
    });
}
