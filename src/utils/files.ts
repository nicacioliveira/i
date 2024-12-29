import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostSlugs(): string[] {
  function getAllFiles(dir: string): string[] {
    let results: string[] = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        results = results.concat(getAllFiles(fullPath));
      } else if (item.endsWith('.md')) {
        results.push(path.relative(postsDirectory, fullPath));
      }
    });

    return results;
  }

  return getAllFiles(postsDirectory).map(file => file.replace(/\.md$/, ''));
}

export async function getPost(slug: string): Promise<Post> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const contentHtml = await marked(content);
    
    return {
      slug,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      content: contentHtml,
      description: data.description || null,
      path: path.dirname(slug) !== '.' ? path.dirname(slug) : ''
    };
  } catch (error) {
    throw new Error(`Failed to get post: ${error}`);
  }
}

export async function getPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(getPost));
  return posts.sort((a, b) => (
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ));
}
