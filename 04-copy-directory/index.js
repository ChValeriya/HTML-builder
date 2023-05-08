import { mkdir } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { copyFile } from 'node:fs';

try {
    const files = new URL('./files-copy/', import.meta.url);
    await mkdir(files, { recursive: true });
    const filesInFolder = await readdir('./04-copy-directory/files', {withFileTypes: true});
    for (const file of filesInFolder) {
      copyFile(`04-copy-directory/files/${file.name}`, `04-copy-directory/files-copy/${file.name}`, callback);
    }
    function callback(err) {
      if (err) throw err;
    }
} catch (err) {
    console.error(err.message);
}