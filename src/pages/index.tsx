import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPosts } from '../utils/files';
import { Post } from '../types/post';
import { SITE_CONFIG } from '../config/constants';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="main">
      <Head>
        <title>{SITE_CONFIG.title}</title>
        <meta name="description" content={SITE_CONFIG.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="site-header">
        <h1 className="site-title">{SITE_CONFIG.title}</h1>
        <p className="site-description">{SITE_CONFIG.description}</p>
      </header>

      <div className="posts-list">
        {posts.map((post) => (
          <article key={post.slug} className="post-item">
            <Link href={`/posts/${post.slug}`} className="post-title">
              {post.title}
            </Link>
            <div className="post-meta">
              {post.path && <span className="post-category">{post.path}</span>}
              <span className="post-date">
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            {post.description && (
              <div className="post-description">{post.description}</div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getPosts();
  return { 
    props: { posts } 
  };
};
