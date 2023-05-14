import path from "node:path";
import { mkdir, writeFile, stat, readdir } from "node:fs/promises";
import type { CAC } from "cac";
import { bold } from "colorette";
import { AsciiTree } from "oo-ascii-tree";
import boxen from "boxen";
import { bundleRequire } from "bundle-require";
import { globby } from "globby";
import { text, select, isCancel, cancel } from "@clack/prompts";

import * as flow from "../flow";
import { configDir, templatesPath } from "../files";
import { TemplateContext } from "../template-api";
import { action as templateAction } from "./template/action";

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
        await runTemplateCreatorWorkflow();
        return;
      }

      const cwd = process.cwd();
      let selectedTemplate = templateName;

      if (!templateName) {
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
          await runTemplateCreatorWorkflow();
          return;
        }

        selectedTemplate = response as string;
      }

      if (!selectedTemplate) {
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

      const name = await text({
        message: `What is the name of this ${selectedTemplate}?`,
      });

      if (isCancel(name)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      flow.spinner.start(`Running ${selectedTemplate} template`);

      for (const { mod } of bundledTemplateFiles) {
        const templateContext: TemplateContext = { input: { name } };
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

async function runTemplateCreatorWorkflow() {
  const createdName = await templateAction();

  flow.end();

  const runCommand = `npx tsnew ${createdName}`;
  const tree = new AsciiTree(
    configDir,
    new AsciiTree("templates", new AsciiTree(createdName))
  );

  console.log("You can update your new templates here:\n");
  console.log(tree.toString());

  console.log("After that, you can run your template:");
  console.log(
    boxen(bold(runCommand), {
      padding: { left: 1, right: 1 },
      borderStyle: "round",
      dimBorder: true,
    })
  );
}
