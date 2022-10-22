import fs from 'node:fs';
import glob from 'glob';

export default function Manylines(): void {
  const args: string[] = process.argv.slice(2);
  const path = './test';
  const fileList: any[] = [];
  let linesOfCode: number = 0;

  glob(path + '/**/*+(.tsx|.ts|.jsx|.js|.css)', { ignore: [ path + '/node_modules/**/*' ] }, (er, files): void => {
    for (const file of files) {
      if (!fs.lstatSync(file).isDirectory()) {
        const data: string = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
        const lines: number = data.split('\n').length;
        fileList.push({ file, lines });
        linesOfCode += lines;
      }
    }

    if (args[1] === '--files') {
      console.log(fileList, 'All lines of code:', linesOfCode);
    } else {
      console.log('All lines of code:', linesOfCode);
    }
  });
}

Manylines();
