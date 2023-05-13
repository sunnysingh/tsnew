# tsnew

Code Generator for TypeScript

## Set up tsnew in your project

1. Install `tsnew` as a global dependency:

```sh
npm install tsnew --global
```

2. Run the setup command:

```sh
tsnew setup
```

This will create an `.tsnew/config.ts` file like this:

```ts
import { defineConfig } from "tsnew";

export default defineConfig({
  templatesPath: ".tsnew/templates",
});
```

3. Create a new template:

```sh
tsnew template component
```

This will create a new `.tsnew/templates/component/component.template.ts` file:

```ts
import { defineInput, defineOutput } from "tsnew";

export const input = defineInput({
  name: {
    description: "Name of component",
  },
});

const template = `
  export function ${input.name} {
    return <p>I am a component.</p>;
  }
`;

export const output = defineOutput({
  filePath: `components/${input.name}.tsx`,
  template,
});
```
