---
title: "F1 Next"
slug: "f1next"
weight: 30
tech: [Typescript, Vue, Nuxt, Netlify]
link: https://f1next.netlify.app/
screenshots: [./src/assets/images/project-f1next.png]
repoLink: https://github.com/ralacerda/nuxt-f1next
---

Este projeto é um aplicativo web para exibir o horário dos eventos de Formula 1, destacando os próximos eventos.

É possível acessar os horários de todos as corridas do ano, incluindo uma contagem regressiva para cada, além do horário de início ajustado ao fuso horário do usuário. O design é original e se adapta a diferentes formatos de tela.

O site utiliza da estratégia de _Server Side Rendering_ utilizando uma _Serverless Function_ que consegue realizar um cache da REST API consumida para gerar a página. Isso permite que o site seja leve e rápido de carregar.
