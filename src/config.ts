export interface Config {
  templatesPath: string;
}

export const currentConfig: Config = {
  templatesPath: ".tsnew/templates",
};

export function defineConfig(options: Partial<Config>) {
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      currentConfig[key] = options[key];
    }
  }
}
