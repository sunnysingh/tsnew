export interface TemplateInput {
  name: string;
}

export interface TemplateContext {
  input: TemplateInput;
}

export interface TemplateResult {
  path: string;
  content: string;
}

export function defineTemplate(
  templateFunction: (context: TemplateContext) => TemplateResult
) {
  return templateFunction;
}
