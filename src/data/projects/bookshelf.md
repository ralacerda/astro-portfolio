---
title: "Bookshelf"
slug: "bookshelf"
weight: 25
tech: [Typescript, React, Next, Contentful, Netlify]
link: https://ralacerda-books.netlify.app/
screenshots: [./src/assets/images/project-bookshelf.png]
repoLink: https://github.com/ralacerda/books-nextjs
---

É comum esquecer completamente quais livros você já leu quando alguém pede uma sugestão de leitura. Para resolver esse problema, comecei um projeto de um website com os livros que recomendo, já li ou estou lendo. Para hospedar as informações de cada livro, como título, nome dos autores, editora, ano de lançamento e imagem da capa, utilizei o **Contentful**, um sistema de gerenciamento de conteúdo (CMS).

Para manter o site sempre atualizado, utilizei o **Next.js** 13, um framework de **React**. Com a estratégia de Server Side Rendering, o site é construído no servidor a cada visita, resultando em um site sempre atualizado.

Como o site lida com informações externas, utilizei o **Zod** para validar os resultados de chamadas da API e o **TypeScript** para garantir que o modelo de conteúdo estivesse de acordo com o código. Isso me permitiu ter confiança quando precisei modificar o modelo de conteúdo ou refatorar meu código.

O resultado é um site rápido, sempre atualizado e fácil de ser mantido. Para adicionar um novo livro, basta utilizar o **CMS**, sem precisar editar o código ou construir o site localmente. Com essa abordagem, o projeto se torna robusto e confiável para futuras atualizações.
