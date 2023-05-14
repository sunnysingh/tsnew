export const compileDefaultTemplate = (name: string) =>
  `
import { defineTemplate } from "tsnew";

export default defineTemplate((context) => ({
  path: \`${name}/\${context.input.name}.ts\`,
  content: \`// This is a starter file for the \${context.input.name} ${name}!\`,
}));
`.trim();
