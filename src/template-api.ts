type ExpandType<T> = { [Key in keyof T]: T[Key] } & {};

export interface PromptType {
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

export interface Template<Prompt extends Record<string, PromptType> = never> {
  input?: Prompt;
  path: (context: {
    input: ExpandType<GetPromptTypes<Prompt>>;
  }) => string | Promise<string>;
  content: (context: {
    input: ExpandType<GetPromptTypes<Prompt>>;
  }) => string | Promise<string>;
}

export function defineTemplate<
  const Prompt extends Record<string, PromptType> = never
>(template: Template<Prompt>) {
  return template;
}
