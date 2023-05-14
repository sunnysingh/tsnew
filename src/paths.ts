import path from "node:path";

export const configPath = path.join(process.cwd(), ".tsnew");

export const readmePath = path.join(configPath, "README.md");

export const templatesPath = path.join(configPath, "templates");
