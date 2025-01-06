import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPost, getPostSlugs } from '../../utils/files';
import { Post } from '../../types/post';
import { SITE_CONFIG } from '../../config/constants';

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const description = post.description || post.content.slice(0, 155).replace(/<[^>]*>/g, '');
  const canonicalUrl = `${SITE_CONFIG.siteUrl}/posts/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_CONFIG.title} />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": description,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": SITE_CONFIG.author
            },
            "publisher": {
              "@type": "Organization",
              "name": SITE_CONFIG.title,
              "url": SITE_CONFIG.siteUrl
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })}
        </script>
      </Head>

      <article itemScope itemType="https://schema.org/BlogPosting">
        <Link href="/" className="back-link">
          ← {SITE_CONFIG.messages.back}
        </Link>

        <h1 itemProp="headline">{post.title}</h1>

        <time 
          itemProp="datePublished" 
          dateTime={post.date}
          className="post-date"
        >
          {new Date(post.date).toLocaleDateString(SITE_CONFIG.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>

        <div 
          itemProp="articleBody"
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/<h1>.*<\/h1>/, '')} }
        />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map(slug => ({
      params: { slug: slug.split('/') }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (!params?.slug || !Array.isArray(params.slug)) {
    return { notFound: true };
  }

  try {
    const post = await getPost(params.slug.join('/'));
    
    return { 
      props: {
        post: {
          ...post,
          title: post.title || '',
          date: post.date || new Date().toISOString(),
          content: post.content || '',
          description: post.description || null,
          path: post.path || ''
        }
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }
};
