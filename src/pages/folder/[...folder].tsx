import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getFolderStructure, getPostsByFolder } from '../../utils/files';
import { Post } from '../../types/post';
import { SITE_CONFIG } from '../../config/constants';

interface FolderPageProps {
  posts: Post[];
  currentFolder: string;
}

export default function FolderPage({ posts = [], currentFolder }: FolderPageProps) {  // Valor padrão para posts
  return (
    <>
      <Head>
        <title>{`${currentFolder} - ${SITE_CONFIG.title}`}</title>
      </Head>
      <div className="posts-list">
        <h1>{currentFolder}</h1>
        {(!posts || posts.length === 0) ? (  // Verificação de segurança adicional
          <p>{SITE_CONFIG.messages.noPostsFound}</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="post-item">
              <h2>
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <div className="post-meta">
                <time>{post.date}</time>
                <span className="post-category">{post.path}</span>
              </div>
              {post.description && <p>{post.description}</p>}
            </article>
          ))
        )}
        <Link href="/" className="back-link">
          {SITE_CONFIG.messages.backToHome}
        </Link>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const structure = getFolderStructure();
  const paths: { params: { folder: string[] } }[] = [];

  function addFolderPath(folder: { path: string, subfolders: any[] }) {
    if (folder.path) {  // Verifica se o path existe
      paths.push({
        params: { folder: folder.path.split('/') }
      });
    }
    folder.subfolders.forEach(addFolderPath);
  }
  
  structure.forEach(addFolderPath);
  
  console.log('Generated folder paths:', paths);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<FolderPageProps> = async ({ params }) => {
  if (!params?.folder || !Array.isArray(params.folder)) {
    return { 
      props: { 
        posts: [],
        currentFolder: ''
      }
    };
  }

  const folderPath = params.folder.join('/');
  console.log('Building folder page for:', folderPath);

  try {
    const posts = await getPostsByFolder(folderPath);
    console.log('Posts found for folder:', posts.length);

    return {
      props: {
        posts: posts || [], // Garante que sempre retornamos um array
        currentFolder: folderPath
      }
    };
  } catch (error) {
    console.error('Error building folder page:', error);
    return { 
      props: { 
        posts: [],
        currentFolder: folderPath
      }
    };
  }
};
