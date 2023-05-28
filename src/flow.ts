import { intro, outro, spinner as createSpinner } from '@clack/prompts';
import { blueBright, dim } from 'colorette';

export { log } from '@clack/prompts';

export function start() {
  console.log(); // newline
  intro(`🆕 ${blueBright('tsnew')} ${dim('start')}`);
}

export function end() {
  outro(`🆕 ${blueBright('tsnew')} ${dim('end')}`);
}

export const spinner = createSpinner();
