import { readdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createWriteStream } from 'node:fs';

const writeStream = createWriteStream('./05-merge-styles/project-dist/bundle.css');

try {
  const files = await readdir('./05-merge-styles/styles', {withFileTypes: true});
  for (const file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
        let data = '';
        const readableStream = createReadStream(`./05-merge-styles/styles/${file.name}`, 'utf-8');
        readableStream.on('data', chunk => data = data + chunk + '\n');
        readableStream.on('end', () => writeStream.write(data));
    }
  }
} catch (err) {
  console.error(err);
}