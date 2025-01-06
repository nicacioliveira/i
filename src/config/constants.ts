export const SITE_CONFIG = {
    title: 'Nicácio O. de Sousa',
    author: 'Nicácio O. de Sousa',
    description: 'Personal stuffs and thoughts about programming, technology and life',
    language: 'pt-BR',
    siteUrl: 'https://nicacio.dev',
    defaultSeo: {
        title: 'Nicácio O. de Sousa',
        description: 'Personal stuffs and thoughts about programming, technology and life',
        author: 'Nicácio O. de Sousa',
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Nicácio O. de Sousa`,
        rights: 'All rights reserved.',
    },
    social: {
        github: 'https://github.com/seu-usuario',
        twitter: 'https://twitter.com/seu-usuario',
        linkedin: 'https://linkedin.com/in/seu-usuario',
    },
    dateFormat: 'MM/dd/yyyy',
    messages: {
        noPostsFound: 'No posts found.',
        notFound: 'Not found.',
        readMore: 'Read more',
        backToHome: 'Back to home',
    }
} as const;

export const CATEGORIES = {
    tech: {
        name: 'Tech',
        description: 'Posts about programming and technology',
    },
    personal: {
        name: 'Personal',
        description: 'Experience and thoughts about life',
    },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export type Categories = typeof CATEGORIES;
