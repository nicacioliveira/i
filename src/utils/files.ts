import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Post } from '../types/post';
import { FolderStructure } from '../types/folder';

const postsDirectory = path.join(process.cwd(), 'posts');

function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

export function getFolderStructure(dir: string = postsDirectory): FolderStructure[] {
  const items = fs.readdirSync(dir);
  const structure: FolderStructure[] = [];

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      const relativePath = normalizePath(path.relative(postsDirectory, fullPath));
      structure.push({
        name: item,
        path: relativePath,
        subfolders: getFolderStructure(fullPath)
      });
    }
  });

  return structure;
}

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (item.endsWith('.md')) {
      const relativePath = normalizePath(path.relative(postsDirectory, fullPath));
      results.push(relativePath);
    }
  });

  return results;
}

export function getPostSlugs(): string[] {
  const files = getAllFiles(postsDirectory);
  return files.map(file => file.replace(/\.md$/, ''));
}

export async function getPost(slug: string): Promise<Post> {
  const normalizedSlug = normalizePath(slug);
  const fullPath = path.join(postsDirectory, `${normalizedSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const contentHtml = await marked(content);

    const postFolder = normalizePath(path.dirname(normalizedSlug));
    
    return {
      slug: normalizedSlug,
      title: data.title || 'Sem título',
      date: data.date || new Date().toISOString().split('T')[0],
      content: contentHtml,
      description: data.description || null,
      path: postFolder === '.' ? '' : postFolder
    };
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    throw error;
  }
}

export async function getPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  
  console.log('Found slugs:', slugs);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        return await getPost(slug);
      } catch (error) {
        console.error(`Erro ao processar post ${slug}:`, error);
        throw error;
      }
    })
  );

  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostsByFolder(folderPath: string): Promise<Post[]> {
  const allPosts = await getPosts();
  console.log('Getting posts for folder:', folderPath);
  console.log('All posts:', allPosts.map(p => ({ slug: p.slug, path: p.path })));

  const filteredPosts = allPosts.filter(post => {
    const postInFolder = post.path === folderPath;
    console.log(`Post ${post.slug} in folder ${folderPath}?`, postInFolder);
    return postInFolder;
  });

  console.log('Filtered posts:', filteredPosts.map(p => p.slug));
  return filteredPosts;
}
