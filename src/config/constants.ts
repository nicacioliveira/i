export const SITE_CONFIG = {
    // Informações básicas
    title: 'Nicácio O. de Sousa',
    author: 'Nicácio O. de Sousa',
    description: '.... good description',
    language: 'pt-BR',
    siteUrl: 'https://nicacio.dev',

    // Metadados padrão para SEO
    defaultSeo: {
        title: 'Meu Blog - Pensamentos sobre Programação',
        description: 'Blog pessoal sobre desenvolvimento, tecnologia e experiências',
        author: 'Nicácio O. de Sousa',
    },

    // Configurações de navegação
    navigation: {
        home: 'Home',
        about: 'Sobre',
    },

    // Copyright e rodapé
    footer: {
        copyright: `© ${new Date().getFullYear()} Seu Nome`,
        rights: 'Todos os direitos reservados',
    },

    // Links sociais
    social: {
        github: 'https://github.com/seu-usuario',
        twitter: 'https://twitter.com/seu-usuario',
        linkedin: 'https://linkedin.com/in/seu-usuario',
    },

    // Formatação de data
    dateFormat: 'dd/MM/yyyy',

    // Configurações de posts
    postsPerPage: 10,

    // Mensagens
    messages: {
        noPostsFound: 'Nenhum post encontrado nesta categoria.',
        readMore: 'Ler mais',
        backToHome: 'Voltar para Home',
    }
} as const;

// Configurações de categorias
export const CATEGORIES = {
    tech: {
        name: 'Tecnologia',
        description: 'Posts sobre desenvolvimento e tecnologia',
    },
    personal: {
        name: 'Pessoal',
        description: 'Experiências e reflexões pessoais',
    },
} as const;

// Tipos para as constantes
export type SiteConfig = typeof SITE_CONFIG;
export type Categories = typeof CATEGORIES;
