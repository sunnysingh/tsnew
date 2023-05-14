# 🆕 tsnew

> 🚧 **COMING SOON**

Code Generator for TypeScript

## 📖 Set up tsnew in your project

1. Install `tsnew` as a development dependency:

```sh
npm install tsnew --save-dev
```

2. Run the setup command:

```sh
npx tsnew setup
```

This will create a `.tsnew` folder to store templates.

3. Create a new template:

```sh
npx tsnew template component
```

This will create a `.tsnew/templates/component/default.template.ts` file:

```ts
import { defineTemplate } from "tsnew";

export default defineTemplate((input) => ({
  path: `components/${input.name}.tsx`,
  template: `Hello ${input.name}.`,
}));
```

## 👋 Development

**Prerequisites**: [NVM](https://nvm.sh/)

1. `nvm use`
2. `npm install`
3. `npm run dev`
4. `npm link`

You can now run `tsnew` commands.
