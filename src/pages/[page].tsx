import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllPages, getPage, StandalonePage } from '../utils/pages';

interface StaticPageProps {
  page: StandalonePage | null;
}

export default function StaticPage({ page }: StaticPageProps) {
  if (!page) {
    return <div>Página não encontrada</div>;
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
        {page.description && (
          <meta name="description" content={page.description} />
        )}
      </Head>
      <article className="page-content">
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getAllPages();
  
  return {
    paths: pages.map(page => ({
      params: { page }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<StaticPageProps> = async ({ params }) => {
  if (!params?.page || Array.isArray(params.page)) {
    return { notFound: true };
  }

  const page = await getPage(params.page);
  
  if (!page) {
    return { notFound: true };
  }

  return {
    props: { page }
  };
};
