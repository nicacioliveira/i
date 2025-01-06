import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const pagesDirectory = path.join(process.cwd(), 'pages-md');

export interface StandalonePage {
  slug: string;
  title: string;
  content: string;
  description?: string | null;
}

export async function getPage(slug: string): Promise<StandalonePage | null> {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const contentHtml = await marked(content);
    
    return {
      slug,
      title: data.title || 'No title',
      content: contentHtml,
      description: data.description || null
    };
  } catch (error) {
    console.error(`Error loading page ${slug}:`, error);
    return null;
  }
}

export function getAllPages(): string[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }

  return fs.readdirSync(pagesDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}
