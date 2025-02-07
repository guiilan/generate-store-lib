const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("❌ Erro: Você deve fornecer um nome de arquivo.");
  process.exit(1);
}

const className = (args[0].charAt(0).toUpperCase() + args[0].slice(1)).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
const archiveName = `${args[0]}.store.ts`;
const srcPath = path.resolve('src');

const findFolderRecursively = (dirPath, folderName) => {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory() && item.name === folderName) {
      return path.resolve(dirPath, item.name);
    } else if (item.isDirectory()) {
      const found = findFolderRecursively(path.resolve(dirPath, item.name), folderName);
      if (found) return found;
    }
  }

  return null;
};

let savePath = findFolderRecursively(srcPath, args[0]);

if (!savePath) {
  savePath = path.resolve(srcPath, args[0]);
  fs.mkdirSync(savePath, { recursive: true });
}

const outputPath = path.resolve(savePath, archiveName);

const content = `
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

@Injectable()
export class ${className}ComponentStore extends ComponentStore<object> {

  constructor() {
    super();
  }

}
`;

fs.writeFileSync(outputPath, content);
console.log(`✅ Arquivo "${archiveName}" gerado em: ${outputPath}`);
