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

export default defineTemplate({
  input: {
    name: { type: "text", message: "What is the name of this ${name}?" },
  },
  path: async ({ input }) =>
    \`${name}/\${input.name}.ts\`,
  content: async ({ input }) =>
    \`// Starter file for the \${input.name} ${name}.\`,
});
`.trim();
