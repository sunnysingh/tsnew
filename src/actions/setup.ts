import { configDir, hasConfigDir, createConfigDir } from "../files";

export const setup = async () => {
  const exists = await hasConfigDir();

  if (exists) {
    console.log("This project is already set up.");
    return;
  }

  await createConfigDir();

  console.log(`\nCreated ${configDir}`);
};
