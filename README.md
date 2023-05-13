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
  templatesPath: "templates",
});
```
