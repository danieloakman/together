import { fileURLToPath } from 'url';

/**
 * @requires NodeJS
 * @description Declares and runs a main function if the entry point to the program is the current file. This is esstentially the same as
 * python's `if __name__ == '__main__'` block.
 * @param mainFunction The main function to run.
 */
export function main<T extends () => Promise<any>>(url: string, mainFunction: T): ReturnType<T> | undefined {
  if (url.startsWith('file:')) {
    const modulePath = fileURLToPath(url);
    if (process.argv[1] === modulePath) {
      return mainFunction() as ReturnType<T>;
    }
  }
}

/** Logs an error message then calls `process.exit` with an optionally given code. */
export function exit(message: string, exitCode = 1): never {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(exitCode);
}
