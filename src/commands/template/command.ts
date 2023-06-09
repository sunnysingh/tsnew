import type { CAC } from 'cac';

import * as flow from '../../flow';
import { action, printPostActionInstructions } from './action';

export function registerCommand(cli: CAC) {
  cli.command('template', 'Create a new template').action(async () => {
    flow.start();

    const name = await action();

    flow.end();

    printPostActionInstructions(name);
  });
}
