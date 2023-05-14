export interface Config {}

export const currentConfig: Config = {};

export function defineConfig(options: Partial<Config>) {
  for (const key in options) {
    if (!options.hasOwnProperty(key)) continue;

    if (!(key in currentConfig)) {
      throw new Error(`Invalid config option: ${key}`);
    }

    currentConfig[key as keyof Config] = options[key as keyof Config] as never;
  }
}
