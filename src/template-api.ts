type ExpandType<T> = { [KeyType in keyof T]: T[KeyType] } & {};

interface PromptType {
  type: "text" | "confirm";
  message: string;
}

type GetPromptTypes<Prompt extends Record<string, PromptType>> = {
  [Property in keyof Prompt]: Prompt[Property]["type"] extends "text"
    ? string
    : Prompt[Property]["type"] extends "confirm"
    ? boolean
    : undefined;
};

export interface TemplateContext<Input> {
  input: Input;
}

export interface Template<
  Prompt extends Record<string, PromptType> = Record<string, PromptType>
> {
  input?: Prompt;
  path: (
    context: ExpandType<TemplateContext<ExpandType<GetPromptTypes<Prompt>>>>
  ) => string;
  content: (
    context: ExpandType<TemplateContext<ExpandType<GetPromptTypes<Prompt>>>>
  ) => string;
}

export function defineTemplate<const Prompt extends Record<string, PromptType>>(
  template: Template<Prompt>
) {
  return template;
}
