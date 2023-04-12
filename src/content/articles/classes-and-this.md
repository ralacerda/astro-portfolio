---
title: "Entendendo classes do Javascript"
isDraft: true
---

Se você já estudou Javascript, provavelmente já viu as palavras `this`, `new` e `class`. Quando eu estudei elas pela primeira vez, elas fizeram sentido. Depois, quando precisei me aprofundar, percebi que o que eu achava que eu entendia, eu não entendia direito, e quanto mais eu tentava entender, pior ficava.

Foi somente depois de vários cursos, tentativa e erro, e experimentos no terminal que eu sinto que consegui finalmente entender o que está acontecendo.

Eu não acredito que o aprendizado é linear, e acho que alguém dificilmente vai entender esses conceitos de primeira, é preciso voltar e revisar várias vezes, mas ler explicações diferentes também ajudam a solidificar o conhecimento. Por isso, resolvi qual linha de exercício que eu segui para finalmente entender esses conceitos.

Vamos imaginar um cenário que eu tenho vários usuários no meu aplicativo. A melhor forma de representar essas usuários no meu aplicativo, é utilizando um objeto.

```javascript
const user = {
  fistName: "Renato",
  secondName: "Lacerda",
  favoriteColor: "Vermelho",
};
```

Certo, o problema é que eu provavelmente não quero escrever esse objeto para cada um dos meus usuários. Uma forma muito mais interessante seria ter uma função que cria esse objeto.

```javascript
function createUser(firstName, secondName, favoriteColor) {
  return { firstName, secondName, favoriteColor };
}

const user1 = createUser("Renato", "Lacerda", "Vermelho");
```

!! { firstName } é a mesma coisa que escrever { firstName: firstName}.
