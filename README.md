# 🆕 tsnew

> 🚧 **COMING SOON** - Experimental stage. Not ready for public usage yet.

Code scaffolding tool for TypeScript projects.

## ⏩ Set up tsnew in your project

1. Install `tsnew` as a development dependency:

```sh
npm install tsnew --save-dev
```

2. Run the interactive prompt:

```sh
npx tsnew
```

## 🔠 Template API

Templates are defined in `.template.ts` files:

```ts
import { defineTemplate } from 'tsnew';

export default defineTemplate({
  input: {
    name: { type: 'text', message: 'What is the name of this feature?' },
    jsx: { type: 'confirm', message: 'Will this feature have components?' },
  },
  path: async ({ input }) =>
    `features/${input.name}.${input.jsx ? 'tsx' : 'ts'}`,
  content: async ({ input }) =>
    `// Starter file for the ${input.name} feature.`,
});
```

Templating with tsnew is powerful! You can import other packages and run asynchronous data processing.

## 🎦 Development

The contribution experience is still a work in progress.

**Prerequisites**: [NVM](https://nvm.sh/)

1. `nvm use`
2. `npm install`
3. `npm run dev`
4. `npm link`

You can now run `tsnew` commands.
