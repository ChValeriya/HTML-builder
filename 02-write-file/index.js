const fs = require('fs');
const readline = require('readline');
const {
    stdin: input,
    stdout: output,
} = require('node:process');
const rl = readline.createInterface({ input, output });

const writeStream = fs.createWriteStream('./02-write-file/text.txt');

rl.write('Hello! Type something here.\n');
rl.on('line', (input) => {
    if (input === 'exit') {
        rl.write('Good luck!');
        rl.close();
    } else {
        writeStream.write(input + '\n');
    }
});
rl.on('SIGINT', () => {
    rl.write('Good luck!');
    rl.close();
});