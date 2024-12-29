---
title: 'Criando um Blog com Next.js e Markdown'
date: '2024-01-01'
description: 'Um guia completo sobre como criar um blog moderno usando Next.js, TypeScript e Markdown'
---

<div class="banner-image">
<img src="https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/65ea99845e53084280471b71_most%20beautiful%20landscapes%20in%20the%20world.webp" alt="Paisagem bonita"/>
</div>

# Criando um Blog com Next.js e Markdown

Neste post, vou mostrar como criar um blog moderno usando Next.js, TypeScript e Markdown.

## Stack Tecnológica

<div class="image-grid">

![Next.js Logo](https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg)

![TypeScript Logo](https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg)

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

</div>

## Sobre o Projeto

Este blog é construído usando tecnologias modernas e práticas recomendadas de desenvolvimento web.

### Arquitetura do Projeto

<div class="image-small">

![Vercel Architecture](https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg)
*Arquitetura baseada em Vercel e Next.js*

</div>

## Tutorial em Vídeo

Para uma explicação mais detalhada, confira o vídeo abaixo:

<div class="video-container">
<iframe 
 width="560" 
 height="315" 
 src="https://www.youtube.com/embed/Sklc_fQBmcs" 
 title="Next.js Tutorial" 
 frameborder="0" 
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
 allowfullscreen
></iframe>
</div>

## Ferramentas Utilizadas

### Editor e Desenvolvimento

<div class="image-gallery">

![VS Code](https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg)

![Git](https://upload.wikimedia.org/wikipedia/commons/c/c5/Git_Icon.svg)

![Node.js](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg)

![JavaScript](https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg)

</div>

## Recursos Úteis

Para quem quiser se aprofundar mais no assunto, recomendo os seguintes recursos:

1. [Documentação do Next.js](https://nextjs.org/docs)
2. [Guia de TypeScript](https://www.typescriptlang.org/docs/)
3. [Markdown Guide](https://www.markdownguide.org/)

## Exemplos de Código

Aqui está um exemplo simples de como configurar as rotas no Next.js:

```typescript
// pages/posts/[slug].tsx
export async function getStaticProps({ params }) {
 const post = await getPostBySlug(params.slug);
 return {
   props: { post }
 };
}
