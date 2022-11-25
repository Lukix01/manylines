#!/usr/bin/env node

import fs from 'node:fs';
import glob from 'glob';

type File = {
  file: string;
  lines: number;
};

const colors = {
  white: '\u001B[0m',
  orange: '\u001B[33m',
};

class Manylines {
  private path: string;
  private flag: string;
  private allLines: number = 0;
  private fileList: File[] = [];
  private name: string = colors.orange + '/ Manylines /' + colors.white;

  constructor(args: string[]) {
    this.path = args[0];
    this.flag = args[1];
  }

  public execute(): void {
    glob(this.path + '/**/*+(.tsx|.ts|.jsx|.js|.py|.java|.css|.scss)', { ignore: [ this.path + '/**/*node_modules/**/*' ] }, (er, files): void => {
      for (const file of files) {
        if (!fs.lstatSync(file).isDirectory()) {
          const data: string = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
          const lines: number = data.split('\n').length;
          this.fileList.push({ file, lines });
          this.allLines += lines;
        }
      }

      this.fileList.sort((a, b): number => b.lines - a.lines);

      if (this.flag === '--files') {
        console.table(this.fileList);
        console.log(this.name, 'All lines of code:', this.allLines);
      } else {
        console.log(this.name, 'All lines of code:', this.allLines);
      }
    });
  }
}

const manylines: Manylines = new Manylines(process.argv.slice(2));

manylines.execute();
