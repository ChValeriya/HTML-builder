import { mkdir as _mkdir, readFile } from 'fs';
import { readdir } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { copyFile } from 'node:fs';
import { createReadStream } from 'node:fs';
import { createWriteStream } from 'node:fs';

try {
  await mkdir('./06-build-page/project-dist', { recursive: true });
} catch (err) {
  console.error(err.message);
}

try {
  const writeHTML = createWriteStream('./06-build-page/project-dist/index.html');
  let readHTML = createReadStream('./06-build-page/template.html');
  let data = '';
  readHTML.on('data', chunk => data = data + chunk + '\n');
  const componentsHTML = await readdir('./06-build-page/components', {withFileTypes: true});
  for (const component of componentsHTML) {
    const dataHTML = readFile((`./06-build-page/components/${component.name}`), 'utf-8', (err, data) => {
      if (err) throw err;
    });
    data = data.replace(`{{${component.name.split('.')[0]}}}`, dataHTML);
  }
  readHTML.on('end', () => writeHTML.write(data));
} catch (err) {
  console.error(err);
}

const writeStream = createWriteStream('./06-build-page/project-dist/style.css');

try {
  const files = await readdir('./06-build-page/styles', {withFileTypes: true});
  for (const file of files) {
        let data = '';
        const readableStream = createReadStream(`./06-build-page/styles/${file.name}`, 'utf-8');
        readableStream.on('data', chunk => data = data + chunk + '\n');
        readableStream.on('end', () => writeStream.write(data));
  }
} catch (err) {
  console.error(err);
}

try {
    const folders = new URL('./project-dist/assets/', import.meta.url);
    await mkdir(folders, { recursive: true });
    const foldersInFolder = await readdir('./06-build-page/assets', {withFileTypes: true});
    for (const folder of foldersInFolder) {
      const files = new URL(`./project-dist/assets/${folder.name}`, import.meta.url);
      await mkdir(files, { recursive: true });
      const filesInFolder = await readdir(`./06-build-page/assets/${folder.name}`, {withFileTypes: true});
      for (const file of filesInFolder) {
        copyFile(`06-build-page/assets/${folder.name}/${file.name}`, `06-build-page/project-dist/assets/${folder.name}/${file.name}`, callback);
      }
    }
    function callback(err) {
      if (err) throw err;
    }
} catch (err) {
    console.error(err.message);
}