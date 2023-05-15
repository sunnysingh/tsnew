import { dim, bold } from "colorette";
import { AsciiTree } from "oo-ascii-tree";
import boxen from "boxen";

import { configDir } from "../../files";

export function printInstructions(name: string) {
  const runCommand = `npx tsnew ${name}`;
  const fileTree = new AsciiTree(
    configDir,
    new AsciiTree("templates", new AsciiTree(name))
  );

  console.log("You can update your new templates here:\n");
  fileTree.printTree();

  console.log("\nAfter that, you can run your template:");
  console.log(
    boxen(`${dim("$")} ${bold(runCommand)}`, {
      padding: { left: 1, right: 1 },
      borderStyle: "round",
      dimBorder: true,
    })
  );
}
