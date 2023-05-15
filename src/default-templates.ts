export const readme = `
# 🆕 tsnew

Code Generator for TypeScript

## Usage

For a list of available templates, run:

\`\`\`sh
npx tsnew
\`\`\`
`.trim();

export const compileStarterTemplate = (name: string) =>
  `
import { defineTemplate } from "tsnew";

export default defineTemplate((context) => ({
  path: \`${name}/\${context.input.name}.ts\`,
  content: \`// This is a starter file for the \${context.input.name} ${name}!\`,
}));
`.trim();
