import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface FolderStructure {
  name: string;
  path: string;
  subfolders: FolderStructure[];
}

export function getFolderStructure(dir: string = postsDirectory): FolderStructure[] {
  const items = fs.readdirSync(dir);
  const structure: FolderStructure[] = [];

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      const relativePath = path.relative(postsDirectory, fullPath);
      structure.push({
        name: item,
        path: relativePath,
        subfolders: getFolderStructure(fullPath)
      });
    }
  });

  return structure
}
