import { dim, bold } from "colorette";
import { AsciiTree } from "oo-ascii-tree";
import boxen from "boxen";

export function formatCommand(command: string): string {
  return boxen(`${dim("$")} ${bold(command)}`, {
    padding: { left: 1, right: 1 },
    borderStyle: "round",
    dimBorder: true,
  });
}

export function formatFileTree(files: string[]): string {
  const [firstFile, ...otherFiles] = files;
  const tree = new AsciiTree(firstFile);
  let nextChild: AsciiTree = tree;

  for (const file of otherFiles) {
    const ref = new AsciiTree(file);
    nextChild.add(ref);
    nextChild = ref;
  }

  return tree.toString();
}
