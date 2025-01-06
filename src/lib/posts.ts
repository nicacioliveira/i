import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (path.extname(file) === '.md') {
      const relativePath = path.relative(postsDirectory, fullPath);
      arrayOfFiles.push(relativePath);
    }
  });

  return arrayOfFiles;
}

export function getPostSlugs(): string[] {
  return getAllFiles(postsDirectory)
    .map(file => file.replace(/\.md$/, ''));
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const contentHtml = await marked(content);

  const category = path.dirname(slug) !== '.' ? path.dirname(slug) : 'uncategorized';
  
  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category || category,
    description: data.description,
    content: contentHtml,
    path: category
  };
}

export async function getPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPost(slug)));
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByFolder(folder: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(post => post.path === folder);
}

export function getFolders(): string[] {
  const folders = new Set<string>();
  
  function scanDir(dirPath: string) {
    const relativePath = path.relative(postsDirectory, dirPath);
    if (relativePath) folders.add(relativePath);

    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
      }
    });
  }

  scanDir(postsDirectory);
  return Array.from(folders);
}
