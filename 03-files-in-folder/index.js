import { readdir } from 'node:fs/promises';
import { stat } from 'node:fs';

try {
  const files = await readdir('./03-files-in-folder/secret-folder', {withFileTypes: true});
  for (const file of files) {
    if (file.isFile()) {
        stat(`03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
            console.log(file.name.split('.')[0] + ' - ' + file.name.split('.')[1] + ' - ' + `${stats.size/1024}kb`);
        });
    }
  }
} catch (err) {
  console.error(err);
}