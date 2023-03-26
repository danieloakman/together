import { config } from 'dotenv';
import { join } from 'path';
import { spawn } from 'child_process';
import { main } from '../src/lib/utils/node-util';

config({ path: join(process.cwd(), '.env') });

/**
 * @requires NodeJS `process.env.LINODE_IPV4`
 */
export async function connectToBE(): Promise<undefined> {
  return new Promise(resolve => {
    const p = spawn(`ssh`, [`root@${process.env.LINODE_IPV4}`], { stdio: 'inherit' });
    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(undefined);
    });
    p.on('error', (err) => {
      console.error(`child process exited with error ${err}`);
    });
    p.stdout?.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    p.stderr?.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  });
}

main(module, connectToBE);
