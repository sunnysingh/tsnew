# 🖋 Scriptor

Code Generator for TypeScript

## Set up Scriptor in your project

1. Install `@scriptortools/cli` as a global dependency:

```sh
npm install @scriptortools/cli --global
```

2. Run the setup command:

```sh
scriptor setup
```

This will create a `scriptor.config.ts` file like this:

```ts
import { defineConfig } from "@scriptortools/core";

export default defineConfig({
  templatesPath: ".scriptor/templates",
});
```

3. Create a new template:

```sh
scriptor new template component
```

This will create a new `.scriptor/templates/component/template.ts` file:

```ts
import { defineTemplate, dedent, pascalCase } from "@scriptortools/core";

export default defineTemplate(
  ({ name }) => (
    {
      to: `components/${pascalCase(name)}.ts`,
    },
    `
      export function ${pascalCase(name)} {
        return <p>I am a component.</p>;
      }
    `
  )
);
```
