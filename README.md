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
import { defineTemplate } from "tsnew";

export default defineTemplate(async (context) => ({
  path: `features/${context.input.name}.ts`,
  content: `// This is a starter file for the ${context.input.name} feature.`,
}));
```

The template function receives a context object for input data, and returns an object for the file operation:

- `path` - the file path to be saved
- `content` - the file content to be saved

Templating with tsnew is powerful! You can import other packages and run asynchronous data processing.

More features will be added to support use cases such as updating config files and running lifecycle commands.

## 🎦 Development

The contribution experience is still a work in progress.

**Prerequisites**: [NVM](https://nvm.sh/)

1. `nvm use`
2. `npm install`
3. `npm run dev`
4. `npm link`

You can now run `tsnew` commands.
