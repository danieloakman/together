/**
 * @experimental May move this to a different file.
 * @requires NodeJS
 * @description Declares and runs a main function if the entry point to the program is `module`. This is esstentially the same as
 * python's `if __name__ == '__main__'` block.
 * @param module The NodeModule where this main function is running from.
 * @param mainFunction The main function to run.
 */
export function main(module: any, mainFunction: () => Promise<void>) {
  if (require?.main !== module) return;
  return mainFunction();
}

/** Logs an error message then calls `process.exit` with an optionally given code. */
export function exit(message: string, exitCode = 1): never {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(exitCode);
}
