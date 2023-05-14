export interface TemplateInput {
  name: string;
}

export interface TemplateArgs {
  input: TemplateInput;
}

export interface TemplateDefinition {
  path: string;
  content: string;
}

export function defineTemplate(
  template: (args: TemplateArgs) => TemplateDefinition
) {
  return template;
}
