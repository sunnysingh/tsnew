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

## 🔠 Template Syntax

Templates are defined `.template.ts` files:

```ts
import { defineTemplate } from "tsnew";

export default defineTemplate(async (context) => ({
  path: `components/${context.input.name}.tsx`,
  content: `// Hello ${context.input.name}.`,
}));
```

The template function receives a context object for useful input data.

The template function must return an object with the following properties:

- `path` - the file path to be saved
- `content` - the file content to be saved

Your `.template.ts` files are powerful! You can import and use other packages, templating libraries, and any other code. You may have even noticed that the template function is asynchronous, which enables complex data processing tasks if you need it.

## 🎦 Development

The contribution experience is still a work in progress.

**Prerequisites**: [NVM](https://nvm.sh/)

1. `nvm use`
2. `npm install`
3. `npm run dev`
4. `npm link`

You can now run `tsnew` commands.
