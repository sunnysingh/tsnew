import { defineTemplate } from "tsnew";

export default defineTemplate((context) => ({
  path: `blah/${context.input.name}.ts`,
  content: `// This is a starter file for the ${context.input.name} blah!`,
}));
