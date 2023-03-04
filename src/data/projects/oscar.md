---
title: "Nomeações Oscar"
slug: oscar
weight: 50
tech: [SASS, Typescript, Astro, Node, Mongo, Firebase]
link: https://sequelamovies.web.app/
screenshots: ["./src/assets/images/project-oscar.png"]
repoLink: https://github.com/ralacerda/sequela-movie-app
---

Este projeto buscou criar uma forma fácil de mostrar os filmes indicados e vencedores do Oscar de cada ano. Além de uma visão geral de todos os filmes indicados naquele determinado ano, há também uma página dedicada para cada categoria de premiação.

O primeiro desafio do projeto foi coletar as informações de cada filme nomeado. Escrevi um script em **NodeJS** para organizar os filmes a partir de uma lista de indicados, acessar uma **REST API** e um banco de dados (**MongoDB**) e cruzar as informações de cada filme.

Com **Astro** e **Typescript** foi possível superar o desafio seguinte: criar uma página para cada categoria de cada ano. Com as mesmas ferramentas foi possível lidar com outro desafio: as card com informações de cada filme. O resultado foi um componente que se adapta ao contexto, mostrando o nome do filme ou pessoa indicada, um ícone de troféu para os vencedores, e uma lista de outras indicações.

O design do site foi implementando usando **Sass** e **PicoCSS**. Em telas menores, o tamanho do texto é adaptado e as card mudam de layout para melhor aproveitar o espaço.
