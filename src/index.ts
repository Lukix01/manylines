#!/usr/bin/env node

import fs from 'node:fs';
import glob from 'glob';

export default function Manylines(): void {
  const args: string[] = process.argv.slice(2);
  const path: string = args[0];
  let fileList: any[] = [];
  let linesOfCode: number = 0;

  glob(path + '/**/*+(.tsx|.ts|.jsx|.js|.py|.java|.css|.scss)', { ignore: [ path + '/**/*node_modules/**/*' ] }, (er, files): void => {
    for (const file of files) {
      if (!fs.lstatSync(file).isDirectory()) {
        const data: string = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
        const lines: number = data.split('\n').length;
        fileList.push({ file, lines });
        linesOfCode += lines;
      }
    }

    fileList = fileList.sort((a, b): number => b.lines - a.lines);

    if (args[1] === '--files') {
      console.log(fileList, '\n\n-------- ' + 'All lines of code:', linesOfCode + ' --------');
    } else {
      console.log('All lines of code:', linesOfCode);
    }
  });
}

Manylines();
