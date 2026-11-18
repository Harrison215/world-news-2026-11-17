import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const image = readFileSync(new URL('./entry.png', import.meta.url));
const jpeg = image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff;
const complete = image[image.length - 2] === 0xff && image[image.length - 1] === 0xd9;
if (!jpeg || !complete || image.length > 1_048_576) {
  throw new Error('entry.png must be a whole JPEG no larger than 1 MiB');
}

const output = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(output, { recursive: true });
writeFileSync(join(output, 'entry.png'), image);
