import { readdir } from "fs/promises";
import { select, isCancel, cancel } from "@clack/prompts";

import { templatesPath } from "../../files";
import * as flow from "../../flow";
import * as templateAction from "../template/action";

const RESERVED_ANSWER_ADD_TEMPLATE = "__RESERVED_ANSWER_ADD_TEMPLATE__";
const RESERVED_OPTION_ADD_TEMPLATE = {
  label: "add a new template",
  value: RESERVED_ANSWER_ADD_TEMPLATE,
};

export async function promptTemplateCreation() {
  const createdName = await templateAction.action();
  flow.end();
  templateAction.printPostActionInstructions(createdName);
}

export async function promptTemplateSelection(): Promise<string | undefined> {
  const templates = await readdir(templatesPath);
  const templateOptions = templates.map((template) => ({
    label: template,
    value: template,
  }));

  const response = await select({
    message: "Which template do you want to run?",
    options: [...templateOptions, RESERVED_OPTION_ADD_TEMPLATE],
  });

  if (isCancel(response)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  if (response === RESERVED_ANSWER_ADD_TEMPLATE) {
    await promptTemplateCreation();
    return;
  }

  return response as string;
}
